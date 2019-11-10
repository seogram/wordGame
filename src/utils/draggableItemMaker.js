import uuid from 'uuid/v4';

export default function draggableItemMaker(randomWords) {
  const ITEMS = [];
  randomWords.forEach(word => {
    ITEMS.push({
      id: uuid(),
      content: word.toUpperCase()
    });
  });

  return ITEMS;
}
