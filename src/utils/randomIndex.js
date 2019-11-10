export default function randomIndex(arr) {
  if (!arr) return null;
  return Math.floor(Math.random() * arr.length);
}
