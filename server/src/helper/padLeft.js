// Category ID
exports.padCategoryId = (x) => {
  return "C" + Array(3 - String(x).length + 1).join("0") + x;
};

// Feature ID
exports.padFeatureId = (x) => {
  return "F" + Array(3 - String(x).length + 1).join("0") + x;
};
// Manufacturer ID
exports.padManufacturerId = (x) => {
  return "M" + Array(3 - String(x).length + 1).join("0") + x;
};

// Product ID
exports.padProductId = (x) => {
  return "P" + Array(8 - String(x).length + 1).join("0") + x;
};

// Role ID
exports.padRoleId = (x) => {
  return "R" + Array(3 - String(x).length + 1).join("0") + x;
};

// Specification ID
exports.padSpecificationId = (x) => {
  return "S" + Array(3 - String(x).length + 1).join("0") + x;
};

// Status ID
exports.padStatusId = (x) => {
  return "STA" + Array(2 - String(x).length + 1).join("0") + x;
};

// User ID
exports.padUserId = (x) => {
  return "U" + Array(8 - String(x).length + 1).join("0") + x;
};

// Brand ID
exports.padBrandId = (x) => {
  return Array(3 - String(x).length + 1).join("0") + x;
};
