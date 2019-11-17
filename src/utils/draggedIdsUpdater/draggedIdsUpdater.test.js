import draggedIdsUpdater from "./draggedIdsUpdater";

describe("draggedIdsUpdater", () => {
  it("should delete deletedItem id from draggedIds", () => {
    const draggedIds = [
      "ea5a67d0-efea-454f-a115-9c5e58847d07",
      "6c8b4838-44fd-476c-a08a-6c444597b7d2",
      "51dfd4e1-6451-441c-a31f-5c24fe912883"
    ];

    const deletedItem = "51dfd4e1-6451-441c-a31f-5c24fe912883";

    const expected = [
      "ea5a67d0-efea-454f-a115-9c5e58847d07",
      "6c8b4838-44fd-476c-a08a-6c444597b7d2"
    ];

    const draggedIds1 = [
      "ea5a67d0-efea-454f-a115-9c5e58847d07",
      "6c8b4838-44fd-476c-a08a-6c444597b7d2",
      "51dfd4e1-6451-441c-a31f-5c24fe912883"
    ];

    const deletedItem1 = "13afd0e1-1891-441c-a31f-5c24fe912111";

    const expected1 = [
      "ea5a67d0-efea-454f-a115-9c5e58847d07",
      "6c8b4838-44fd-476c-a08a-6c444597b7d2",
      "51dfd4e1-6451-441c-a31f-5c24fe912883"
    ];
    expect(draggedIdsUpdater(draggedIds, deletedItem)).toEqual(expected);
    expect(draggedIdsUpdater(draggedIds1, deletedItem1)).toEqual(expected1);
  });
});
