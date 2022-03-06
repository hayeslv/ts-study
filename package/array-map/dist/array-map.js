"use strict";
const arrayMap = (array, callback) => {
    let i = -1;
    const len = array.length;
    const resultArray = [];
    while (++i < len) {
        resultArray.push(callback(array[i], i, array));
    }
    return resultArray;
};
module.exports = arrayMap;
