const draggedIdsUpdater = (draggedIds, deletedItem) => {
  return draggedIds.filter(id => id !== deletedItem);
};

export default draggedIdsUpdater;
