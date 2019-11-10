import * as React from 'react';
import styled from 'styled-components';

const ItemDiv = styled.div`
  width: 100%;
  user-select: none;
  text-align: center;
  font-size: 3rem;
  background: transparent;
`;

const Container = styled.div`
  border: 1px solid #111;
  padding: 0.5rem 0.5rem 3rem 0;
  background: #f2f2f2;
  margin: 5rem 3rem;
  text-align: center;
  width: 100%;
  height: 8rem;
`;

const DroppAbleBoard = ({ Droppable, Draggable, state }) => {
  const mainBoard = Object.keys(state).map((list, index) => {
    return (
      <Droppable
        key={list}
        droppableId={list}
        // isDropDisabled={index === 0 || index === 1}
      >
        {provided => (
          <Container
            data-test="droppAble-objects"
            ref={provided.innerRef}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {state[list].map((item, index1) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index1}>
                  {(provided, snapshot) => (
                    <ItemDiv
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.content}
                    </ItemDiv>
                  )}
                </Draggable>
              );
            })}
          </Container>
        )}
      </Droppable>
    );
  });

  return mainBoard;
};

export default DroppAbleBoard;
