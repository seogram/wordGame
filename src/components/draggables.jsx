/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `0.001s`
  };
}

const ItemDiv = styled.div`
  color: ${props => (props.selected ? 'gray' : 'green')};
  pointer-events: ${props => (props.selected ? 'none' : 'auto')};
  opacity: ${props => (props.selected ? 0.5 : 1)};
  user-select: none;
  border: 1px solid #111;
  padding: 1rem;
  background: #f2f2f2;
  width: 100%;
  height: 2rem;
  margin: 1rem 1.5rem;
`;

const Clone = styled(ItemDiv)`
  ~ div {
    transform: none !important;
  }
`;

const DragItemText = styled.span`
  font-size: 2rem;
  text-align: center;
`;

const DraggAbles = ({ Draggable, items, draggedIds }) => {
  return items.map((item, index) => {
    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
        draggableContent={item.content}
      >
        {(provided, snapshot) => (
          <>
            <ItemDiv
              selected={draggedIds.includes(item.id)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              dragging={snapshot.isDragging}
              // isDragging={snapshot.isDragging}
              // style={provided.draggableProps.style}
              style={getStyle(provided.draggableProps.style, snapshot)}
            >
              {/* <div
                style={
                  snapshot.isDragging
                    ? { background: 'red' }
                    : { background: 'gray' }
                }
              > */}
              <DragItemText>{item.content}</DragItemText>
              {/* </div> */}
              {/* {!snapshot.isDragging && (
                <DragItemText data-test={`object-${item.content}`}>
                  {item.content}
                </DragItemText>
              )} */}
            </ItemDiv>
            {snapshot.isDragging && (
              <Clone>
                <DragItemText
                  style={
                    snapshot.isDragging && {
                      width: '70px',
                      marginRight: '20px',
                      visibility: 'hidden'
                    }
                  }
                >
                  {item.content}
                </DragItemText>
              </Clone>
            )}
          </>
        )}
      </Draggable>
    );
  });
};

export default DraggAbles;
