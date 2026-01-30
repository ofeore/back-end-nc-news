const createLookupObject = require("../createLookupObject");

describe("createLookupObject()", () => {
  test("returns an empty object when given an empty array", () => {
    expect(createLookupObject([], "title", "article_id")).toEqual({});
  });

  test("creates a lookup object from title to article_id", () => {
    const insertedArticles = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" },
    ];

    expect(createLookupObject(insertedArticles, "title", "article_id")).toEqual(
      {
        A: 1,
        B: 2,
        C: 3,
      },
    );
  });

  test("does not mutate the input array or its objects", () => {
    const insertedArticles = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
    ];
    const copy = JSON.parse(JSON.stringify(insertedArticles));

    createLookupObject(insertedArticles, "title", "article_id");

    expect(insertedArticles).toEqual(copy);
  });
});
