function createLookupObject(insertedData, newObjKey, newObjValue) {
  const lookup = {};

  insertedData.forEach((row) => {
    lookup[row[newObjKey]] = row[newObjValue];
  });

  return lookup;
}

module.exports = createLookupObject;
