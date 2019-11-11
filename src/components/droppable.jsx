import * as React from 'react';
import styled from 'styled-components';

const ItemDiv = styled.div`
  width: 100%;
  user-select: none;
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  background: transparent;
`;

const Container = styled.div`
  border: ${props =>
    props.correctAnswer === undefined
      ? '2px solid #111'
      : props.correctAnswer === true
      ? '4px solid green'
      : '2px solid red'};
  padding: 0.5rem 0.5rem 3rem 0;
  background: #f2f2f2;
  margin: 5rem 3rem;
  text-align: center;
  width: 100%;
  height: 8rem;
`;

const DroppAbleBoard = ({ Droppable, Draggable, state, result }) => {
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
            correctAnswer={result[index]}

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
