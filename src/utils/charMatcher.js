export default function charMatcher(answer, selectedChars) {
  const answerCharMap = {};
  const selectedCharsMap = {};
  const answerArr = answer.split('');
  const result = {};
  answerArr.forEach((el, i) => {
    answerCharMap[i] = el.toLowerCase();
  });
  Object.values(selectedChars).forEach((charArr, i) => {
    if (charArr.length) {
      selectedCharsMap[i] = charArr[0].content.toLowerCase();
      if (selectedCharsMap[i] === answerCharMap[i]) {
        result[i] = true;
      } else {
        result[i] = false;
      }
    }
  });
  // console.log('answerCharMap', answerCharMap);
  // console.log('selectedCharsMap', selectedCharsMap);
  return result;
}
