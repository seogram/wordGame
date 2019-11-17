const deletedIds = (dropBoardMap, droppableId) => {
  return Object.keys(dropBoardMap).filter(
    key => dropBoardMap[key] === droppableId
  )[0];
};

export default deletedIds;
