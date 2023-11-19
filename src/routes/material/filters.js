export const textPrefixFilter = ({ filterValue, value }) => {
  return String(value)
    .toUpperCase()
    .startsWith(String(filterValue).toUpperCase());
};

// export const minFilter = ({ filterValue, value }) => {
//   if (typeof value !== "number" || typeof filterValue !== "number") return true;
//   return filterValue <= value;
// };

// export const numberRangeFilter = ({ filterValue, value }) => {
//   if (!Array.isArray(filterValue) || typeof value !== "number") return true;
//   const [min, max] = filterValue;
//   if (min === null && max === null) return true;
//   if (min === null) return value <= max;
//   if (max === null) return min <= value;

//   return min <= value && value <= max;
// };

// export const matchFilter = ({ filterValue, value }) => {
//   if (filterValue === undefined) return true;
//   return filterValue === value;
// };
