export const changeNull = (value, type) => {
  if (!value) {
    if (type === "string") {
      return "No Data";
    } else if (type === "number") {
      return 0;
    }
  } else return value;
};
