export const sortIt = (arr, asc, field, fieldType) => {
  if (fieldType === "number") {
    if (asc) {
      return arr.sort((a, b) => {
        return a[field] - b[field];
      });
    } else {
      return arr.sort((a, b) => {
        return b[field] - a[field];
      });
    }
  } else if (fieldType === "string") {
    if (!asc) {
      return arr.sort((a, b) => a[field].localeCompare(b[field]));
    } else {
      return arr.sort((a, b) => b[field].localeCompare(a[field]));
    }
  } else {
    return arr;
  }
};
