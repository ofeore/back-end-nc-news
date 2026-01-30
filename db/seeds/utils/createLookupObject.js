function createLookupObject(data, newObjKey, newObjValue) {
  const lookup = {};

  data.forEach((row) => {
    lookup[row[newObjKey]] = row[newObjValue];
  });

  return lookup;
}

module.exports = createLookupObject;
