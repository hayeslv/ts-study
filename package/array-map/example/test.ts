import arrayMap from "../dist/array-map";
arrayMap([1,2,3], (item) => {
  return item + 10;
}).forEach(item => {
  console.log(item.length);
});