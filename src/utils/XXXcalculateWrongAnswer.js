export default function calculateWrongAnswer(result) {
  return Object.values(result).filter(res => res === false).length;
}
