import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: React.CSSProperties,
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 10px 10px 0`,

  display: 'inline-flex',
  width: '120px',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  border: '1px solid grey',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  margin: '10px 0',
});

export default function ServiceCommandUnit(props) {
  const { type, subItems, isDropDisabled } = props;
  return (
    <Droppable
      droppableId={`subDroppable-${type}`}
      type="droppableItem"
      isDropDisabled={isDropDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div style={{ display: 'flex' }}>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.name}
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
  );
}
