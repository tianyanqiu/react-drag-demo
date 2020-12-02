import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ServiceCommandUnit from './ServiceCommandUnit';
import { static_items } from './data';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: React.CSSProperties,
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 200,
});

function formatItems(items: any) {
  let result: any[] = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].children?.length > 0) {
      result = result.concat([items[i]]).concat(items[i].children);
    } else {
      result.push(items[i]);
    }
  }
  return result;
}

export default function DndDemo() {
  const [items, setItems] = useState<any[]>(static_items);
  const [isDropDisabled, setIsDropDisabled] = useState<boolean>(false);

  const onDragStart = (result) => {
    const { draggableId } = result;
    const newItems = formatItems(items);
    const dragItem = newItems.find((item) => item.id === draggableId);
    if (dragItem.ext === 'group') {
      setIsDropDisabled(true);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    setIsDropDisabled(false);
    if (!destination) {
      return;
    }
    const sourceIndex = source.index;
    const destIndex = destination.index;
    if (destination.droppableId === 'droppable') {
      // 分组到根目录
      if (source.droppableId.startsWith('subDroppable')) {
        const sourceParentId = source.droppableId.split('-')[1];
        const sourceSubItems = items.find((item) => item.id === sourceParentId)
          .children;

        let newItems = [...items];

        const newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        newItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.children = newSourceSubItems;
          }
          return item;
        });
        setItems(newItems);
      } else {
        // 根目录下排序
        const newItems = reorder(items, sourceIndex, destIndex);
        setItems(newItems);
      }
    } else if (destination.droppableId.startsWith('subDroppable')) {
      const sourceParentId = source.droppableId.split('-')[1];
      const destParentId = destination.droppableId.split('-')[1];

      const sourceSubItems = sourceParentId
        ? items.find((item) => item.id === sourceParentId).children ?? []
        : [];
      const destSubItems = items.find((item) => item.id === destParentId)
        .children
        ? items.find((item) => item.id === destParentId).children ?? []
        : [];

      let newItems = [...items];
      // 同一个分组中元素排序
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex,
        );
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.children = reorderedSubItems;
          }
          return item;
        });
        setItems(newItems);
      } else if (source.droppableId === 'droppable') {
        // 从根目录拖拽至分组
        const [draggedItem] = newItems.splice(sourceIndex, 1);
        const newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === destParentId) {
            item.children = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
      } else {
        // 从一个分组拖拽至另一个分组
        const newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        const newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.children = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.children = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="droppable" type="droppableItem" isCombineEnabled>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      {...provided.dragHandleProps}
                    >
                      {item.ext === 'group' ? (
                        <strong>{item.name}</strong>
                      ) : (
                        item.name
                      )}

                      {item.ext === 'group' && (
                        <ServiceCommandUnit
                          subItems={item.children}
                          type={item.id}
                          isDropDisabled={isDropDisabled}
                        />
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
