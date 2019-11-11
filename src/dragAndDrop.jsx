/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import uuid from 'uuid/v4';
import {
  DragDropContext,
  Droppable,
  Draggable
  // DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { UserContext } from './utils/context';
import DraggAbles from './components/draggables';
import DroppAbleBoard from './components/droppable';
import { Content } from './styles';

// a little function to help us with reordering the result
/* 
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}; */

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

/* const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const uniqueDestClone = destClone.reduce((acc, current) => {
    const x = acc.find(item => item.content === current.content);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = uniqueDestClone;
  return result;
}; */

export default class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const theme = this.context;
    const { length } = theme.answer;
    for (let i = 0; i < length; i += 1) {
      this.setState({
        [i]: []
      });
    }
  }

  onDragEnd = result => {
    const theme = this.context;
    const { source, destination, draggableId } = result;
    if (!source) {
      return;
    }
    if (!destination && source.droppableId === 'ITEMS') {
      return;
    }
    if (!destination && source.droppableId !== 'ITEMS') {
      const filteredItems = this.state[source.droppableId]
        ? this.state[source.droppableId].filter(item => item.id !== draggableId)
        : [];

      this.setState(
        {
          [source.droppableId]: filteredItems
        },
        () => theme.dragChange(this.state, 'dragQuestion1')
      );
      return;
    }
    const { droppableId } = destination;
    if (droppableId === 'ITEMS') {
      console.log('cond1');
      const filteredItems = this.state[source.droppableId]
        ? this.state[source.droppableId].filter(item => item.id !== draggableId)
        : [];

      this.setState(
        {
          [source.droppableId]: filteredItems
        },
        () => theme.dragChange(this.state, 'dragQuestion2')
      );
      return;
    }
    if (droppableId === 'TRASH') {
      const filteredItems = this.state[source.droppableId]
        ? this.state[source.droppableId].filter(item => item.id !== draggableId)
        : [];

      this.setState(
        {
          [source.droppableId]: filteredItems
        },
        () => theme.dragChange(this.state, 'dragQuestion6')
      );
    } else {
      console.log('cond2');

      const isDuplicate = Boolean(
        this.state[droppableId].filter(item => item.content === draggableId)
          .length
      );
      switch (source.droppableId) {
        /*    case destination.droppableId:
          this.setState(
            {
              [destination.droppableId]: reorder(
                this.state[source.droppableId],
                source.index,
                destination.index
              )
            },
            () => theme.dragChange(this.state, 'dragQuestion3')
          );
          break; */
        case 'ITEMS':
          // move from dragObjects to drop  board
          if (isDuplicate) {
            return;
          }
          if (this.state[destination.droppableId].length) {
            return;
          }
          this.setState(
            {
              [destination.droppableId]: copy(
                theme.randomWords,
                this.state[destination.droppableId],
                source,
                destination
              )
            },
            () => theme.dragChange(this.state, 'dragQuestion4')
          );
          break;
        default:
          // move to sibling position

          /*  this.setState(
            move(
              this.state[source.droppableId],
              this.state[destination.droppableId],
              source,
              destination
            ),
            () => theme.dragChange(this.state, 'dragQuestion5')
          ); */
          break;
      }
    }
  };

  render() {
    const theme = this.context;

    return (
      <>
        <div
          style={{ clear: 'both', display: 'block', marginBottom: '2rem' }}
        />
        <DragDropContext
          onDragEnd={this.onDragEnd}
          // onDragUpdate={this.onDragEnd}
        >
          <Droppable droppableId="ITEMS" isDropDisabled>
            {(
              provided
              // snapshot: DroppableStateSnapshot
            ) => (
              <>
                <Content
                  ref={provided.innerRef}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  <DraggAbles Draggable={Draggable} items={theme.randomWords} />
                </Content>
                <div style={{ clear: 'both' }} />
              </>
            )}
          </Droppable>
          <Content>
            <DroppAbleBoard
              Droppable={Droppable}
              Draggable={Draggable}
              state={this.state}
              items={theme.randomWords}
              result={theme.result}
            />
            <div style={{ clear: 'both' }} />
          </Content>
        </DragDropContext>
        <div style={{ height: '100px' }} />
      </>
    );
  }
}

DragAndDrop.contextType = UserContext;
