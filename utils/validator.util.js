exports.validateNotEmpty = (received) => {
  expect(received).not.toBeNull();
  expect(received).not.toBeUndefined();
  expect(received).toBeTruthy();
};

exports.ValidateEntry = (first, second) => {
  expect(second).toEqual(first);
};
