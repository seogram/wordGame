export default function isAnswerCorrect(currentResult, answer) {
  return (
    Object.values(currentResult) &&
    Object.values(currentResult).every(res => res) &&
    Object.values(currentResult).length === answer.length
  );
}
