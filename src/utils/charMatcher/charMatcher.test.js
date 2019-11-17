import charMatcher from "./charMatcher";

describe("charMatcher", () => {
  const answer = "daily";
  it("should match selected chars correctly when no  items  selected", () => {
    const selectedChars = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    };
    const expected = {};
    expect(charMatcher(answer, selectedChars)).toEqual(expected);
  });
  it("should match selected chars correctly when some  items  selected", () => {
    const selectedChars = {
      0: [{ id: "08282a5e-ba67-422d-9403-343c85e36d5e", content: "D" }],
      1: [],
      2: [{ id: "4b861859-7308-42c2-86ae-2aaa3e7dee9a", content: "A" }],
      3: [],
      4: []
    };
    const expected = { 0: true, 2: false };
    expect(charMatcher(answer, selectedChars)).toEqual(expected);
  });

  it("should match selected chars correctly when all  items  selected", () => {
    const selectedChars = {
      0: [{ id: "08282a5e-ba67-422d-9403-343c85e36d5e", content: "D" }],
      1: [{ id: "08282a5e-ba17-422d-9403-343c85e36s1e", content: "A" }],
      2: [{ id: "4b861859-7308-42c2-86ae-2aaa3e7dee9a", content: "I" }],
      3: [{ id: "01232a5e-aa67-422d-9403-343c85e36d5e", content: "L" }],
      4: [{ id: "06712a5e-da67-422d-9403-343c85e36d5e", content: "Y" }]
    };
    const expected = { 0: true, 1: true, 2: true, 3: true, 4: true };
    expect(charMatcher(answer, selectedChars)).toEqual(expected);
  });

  it("should match selected chars correctly when all  items  false", () => {
    const selectedChars = {
      0: [{ id: "08282a5e-ba67-422d-9403-343c85e36d5e", content: "F" }],
      1: [{ id: "08282a5e-ba17-422d-9403-343c85e36s1e", content: "D" }],
      2: [{ id: "4b861859-7308-42c2-86ae-2aaa3e7dee9a", content: "U" }],
      3: [{ id: "01232a5e-aa67-422d-9403-343c85e36d5e", content: "S" }],
      4: [{ id: "06712a5e-da67-422d-9403-343c85e36d5e", content: "A" }]
    };
    const expected = { 0: false, 1: false, 2: false, 3: false, 4: false };
    expect(charMatcher(answer, selectedChars)).toEqual(expected);
  });
});
