const createLookupObject = require("../createLookupObject");

describe("createLookupObject()", () => {
  test("returns an empty object when given an empty array", () => {
    expect(titleToId([])).toEqual({});
  });

  test("creates a lookup object from title to article_id", () => {
    const insertedArticles = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ];

    expect(createLookupObject(insertedArticles)).toEqual({
      A: 1,
      B: 2,
      C: 3,
    });
  });

  test("does not mutate the input array or its objects", () => {
    const insertedArticles = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
    ];
    const copy = JSON.parse(JSON.stringify(insertedArticles));

    createLookupObject(insertedArticles);

    expect(insertedArticles).toEqual(copy);
  });
});
