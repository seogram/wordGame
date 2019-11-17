import isAnswerCorrect from "./isAnswerCorrect";

describe("isAnswerCorrect", () => {
  it("should detect false answer", () => {
    const currentResult = { 0: false, 1: true, 2: true, 3: false, 4: true };
    const answer = "funny";
    expect(isAnswerCorrect(currentResult, answer)).toEqual(false);
  });
  it("should detect correct answer", () => {
    const currentResult = { 0: true, 1: true, 2: true, 3: true, 4: true };
    const answer = "about";
    expect(isAnswerCorrect(currentResult, answer)).toEqual(true);
  });
});
