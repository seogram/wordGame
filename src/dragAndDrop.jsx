/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from "react";
import uuid from "uuid/v4";
import {
  DragDropContext,
  Droppable,
  Draggable
  // DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { UserContext } from "./utils/context";
import DraggAbles from "./components/draggables";
import DroppAbleBoard from "./components/droppable";
import { Content } from "./styles";
import deletedIds from "./utils/deletedIds";
import draggedIdsUpdater from "./utils/draggedIdsUpdater";

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

export default class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.draggedIds = [];
    this.dropBoardMap = {};
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
    if (!destination && source.droppableId === "ITEMS") {
      // dragging item from items to out side of dropboard
      return;
    }
    if (!destination && source.droppableId !== "ITEMS") {
      // Drag item from dropboard to outside of the dropboard
      const deletedItem = deletedIds(this.dropBoardMap, source.droppableId);
      delete this.dropBoardMap[deletedItem];
      this.draggedIds = draggedIdsUpdater(this.draggedIds, deletedItem);
      const filteredItems = this.state[source.droppableId]
        ? this.state[source.droppableId].filter(item => item.id !== draggableId)
        : [];
      this.setState(
        {
          [source.droppableId]: filteredItems
        },
        () => theme.dragChange(this.state, "dragQuestion1")
      );
      return;
    }
    const { droppableId } = destination;
    const isDuplicate = Boolean(
      this.state[droppableId].filter(item => item.content === draggableId)
        .length
    );
    switch (source.droppableId) {
      case "ITEMS":
        // move from dragObjects to drop  board
        if (isDuplicate) {
          return;
        }
        if (this.state[destination.droppableId].length) {
          // dragging multiple items to similar  position
          return;
        }
        // normal dragging single item
        this.draggedIds.push(draggableId);
        this.dropBoardMap[draggableId] = destination.droppableId;

        theme.checkWrongChar(
          theme.randomWords[source.index],
          destination.droppableId
        );

        this.setState(
          {
            [destination.droppableId]: copy(
              theme.randomWords,
              this.state[destination.droppableId],
              source,
              destination
            )
          },
          () => theme.dragChange(this.state)
        );

        break;
      default:
        break;
    }
  };

  render() {
    const theme = this.context;
    return (
      <>
        <div
          style={{ clear: "both", display: "block", marginBottom: "2rem" }}
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
                  <DraggAbles
                    Draggable={Draggable}
                    items={theme.randomWords}
                    draggedIds={this.draggedIds}
                  />
                </Content>
                <div style={{ clear: "both" }} />
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
            <div style={{ clear: "both" }} />
          </Content>
        </DragDropContext>
        <div style={{ height: "100px" }} />
      </>
    );
  }
}

DragAndDrop.contextType = UserContext;
