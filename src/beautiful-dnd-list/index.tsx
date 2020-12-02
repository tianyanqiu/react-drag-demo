import React, { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**
 * 生成items
 * @param count 数量
 */
const getItems = (count: number) =>
  Array.from({ length: count }, (_v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

/**
 * 重新排序
 * @param list 数据项
 * @param startIndex 开始位置索引
 * @param endIndex 结束位置索引
 */
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

/**
 * 获取可拖拽条目的样式
 * @param isDragging 是否正在被拖拽
 * @param draggableStyle 拖拽样式
 */
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "rgba(0,0,0,0.32)" : "grey",
  color: "white",
  ...draggableStyle,
});

/**
 * 获取列表样式
 * @param isDraggingOver
 */
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

/**
 * 使用react-beautiful-dnd实现的拖拽效果
 */
function BeautifulDndList() {
  const defaultItems = useMemo(() => getItems(10), []);
  const [items, setItems] = useState(defaultItems);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems as any);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
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

export default BeautifulDndList;
