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
  color: green;
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

const DraggAbles = ({ Draggable, items }) => {
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
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              // isDragging={snapshot.isDragging}
              // style={provided.draggableProps.style}
              style={getStyle(provided.draggableProps.style, snapshot)}
            >
              {/*     <div
                data-test={`img-${item.content}`}
                style={
                  snapshot.isDragging
                    ? { background: '#red' }
                    : { background: '#red' }
                }
                alt="words"
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
