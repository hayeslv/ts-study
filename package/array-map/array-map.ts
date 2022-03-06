
const arrayMap = <T, U>(array: T[], callback: (item: T, index: number, arr: ReadonlyArray<T>) => U): U[] => {
  let i = -1;
  const len = array.length;
  const resultArray = [];
  while(++i < len) {
    resultArray.push(callback(array[i], i, array));
  }
  return resultArray;
};
export = arrayMap;