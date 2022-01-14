// !交叉类型
const mergeFunc = <T, U>(arg1: T, arr2: U): T & U => {
  let res = {} as T & U;
  res = Object.assign(arg1, arr2);
  return res;
};
mergeFunc({ a: 'a' }, { b: 'b' });

// !联合类型
// type1 | type2 | type3

// !类型保护
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const number = Math.random() * 10;
  if(number < 5) return valueList[0];
  return valueList[1];
};
const item = getRandomValue();

// 方法1
if((item as string).length) {
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}

// 方法2（用于复杂类型判断）
function isString(value: number | string): value is string {
  return typeof value === 'string';
}
if(isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// 方法3（用于简单类型判断）
// typeof 要比较的类型，必须是这几种中的一种：string/number/boolean/symbol
if(typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// !instanceof类型保护
class CreatedByClass1 {
  public age = 18;
  constructor() {}
}
class CreatedByClass2 {
  public name = 'dylan';
  constructor() {}
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2();
}
const item1 = getRandomItem();
if(item1 instanceof CreatedByClass1) {
  console.log(item1.age);
} else {
  console.log(item1.name);
}





