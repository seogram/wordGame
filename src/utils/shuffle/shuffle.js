export default function shuffle(arr) {
  const newArr = arr;
  let i;
  let j;
  for (i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
