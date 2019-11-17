import deletedIds from "./deletedIds";

describe("deletedIds", () => {
  it("should return key of deleted object ids correctly", () => {
    const droppableId = 2;
    const dropBoardMap = {
      "e246bb66-620d-441b-8930-a85e011f94bc": 0,
      "b3a27a93-aeda-4e96-ab73-b85349737902": 2,
      "9b2ac660-f71f-4d8c-b4a7-eb8afbc809ea": 3
    };
    const expected = "b3a27a93-aeda-4e96-ab73-b85349737902";
    expect(deletedIds(dropBoardMap, droppableId)).toEqual(expected);
  });

  it("should return the whole dropboardMap when there is no deleted object", () => {
    const droppableId = 9;
    const dropBoardMap = {
      "e246bb66-620d-441b-8930-a85e011f94bc": 0,
      "b3a27a93-aeda-4e96-ab73-b85349737902": 2,
      "9b2ac660-f71f-4d8c-b4a7-eb8afbc809ea": 3
    };
    expect(deletedIds(dropBoardMap, droppableId)).toEqual(undefined);
  });
});
