
// ! symbol不能和其他类型做运算
const s1 = Symbol('dy');
// s1 + 1 => ERROR

// ! symbol可以转换为字符串或bool
console.log(s1.toString()); // "Symbol(dy)"
console.log(Boolean(s1));   // true
console.log(!s1);           // false

// ! es6语法
let prop = 'name';
const info = {
  // name: 'dylan'
  [prop]: 'dylan',
  [`my${prop}is`]: 'dylan'
};
console.log(info);

// ! symbol使用上面的语法
const s2 = Symbol('name');
const info2 = {
  [s2]: 'dylanSymbol',
  age: 18,
  sex: 'man'
};
console.log(info2);
info2[s2] = 'haha'; // 修改symbol属性名的内容
console.log(info2);

// ! 下面几种方式都无法遍历到symbol属性名
for(const key in info2) {
  console.log(key);
}
console.log(Object.keys(info2));
console.log(Object.getOwnPropertyNames(info2));
console.log(JSON.stringify(info2));

// ! 可以使用这里的方法获取对象中的Symbol属性名
console.log(Object.getOwnPropertySymbols(info2));
console.log(Reflect.ownKeys(info2));

// ! Symbol两个静态方法：Symbol.for() 、 Symbol.keyFor()
// Symbol.for它返回的也是一个Symbol值，
// 但是当再次使用Symbol.for方法创建时，
// 它首先会拿传入的字符串去全局范围找一下有没有使用这个字符串创建的Symbol，
// 如果有的话就直接返回原来的这个值,如果没有才会新创建一个
const s3 = Symbol.for("dylan");
const s4 = Symbol.for("dylan");
// console.log(s3 === s4); // true

// ! 如果传入的Symbol是使用Symbol.for注册的，Symbol.keyFor会返回当前Symbol初始化时的标识
console.log(Symbol.keyFor(s2)); // undfined
console.log(Symbol.keyFor(s3)); // dylan


// ! 内置的 Symbol 值
// ! 1、Symbol.hasInstance
const obj1 = {
  [Symbol.hasInstance] (otherObj) { // 外部对象调用 instanceof 后，会进入这里进行判断，这里返回true，外部的instanceof就会返回true
    console.log(otherObj); // {a: 'a1'}
  }
};
console.log({ a: 'a1' } instanceof (obj1 as any)); // false：这个对象不是obj1创建的实例

// ! 2、Symbol.isConcatSpreadable
// 它是一个可读写的 bool 值，当一个数组的这个值设为false时，这个数组的concat就不会被扁平化（拆开）
let arr = [1, 2];
console.log([].concat(arr, [3, 4])); // [1, 2, 3, 4]
arr[Symbol.isConcatSpreadable] = false;
console.log([].concat(arr, [3, 4])); // [[1, 2], 3, 4]

// ! 3、Symbol.species
class C extends Array {
  constructor(...args) {
    super(...args);
  }
  static get [Symbol.species] () { // 指定一个创建衍生对象的构造函数
    return Array;
  }
  getName() {
    return 'dylan';
  }
}
// @ts-ignore
const c = new C(1,2,3);
console.log(c); // [1, 2, 3]
const a = c.map(item => item + 1);
console.log(a);
console.log(a instanceof C); // true，但是如果设置了Symbol.species 则返回false
console.log(a instanceof Array); // 都是 true

// ! 4、Symbol.match
// 当在一个字符串上调用match方法的时候，会调用这个方法
let obj2 = {
  [Symbol.match] (str) {
    console.log(str.length); // 5
    return 'haha';
  }
};
// @ts-ignore
console.log('abcde'.match(obj2)); // haha

// ! 5、Symbol.replace
// 调用replace方法的时候会调用这个方法

// ! 6、Symbol.search

// ! 7、Symbol.split

// ! 8、Symbol.iterator
// 数组的这个属性，指向该数组的默认遍历器方法

// ! 9、Symbol.toPrimitive
// 当前对象转成原始类型时，会调用这个方法
let obj4: unknown = {
  [Symbol.toPrimitive](type) {
    console.log(type);
  }
};
// const res = (obj4 as number)++; // number
const res = `abc${obj4}`; // string

// ! 10、Symbol.toStringTag
// 当在对象上调用 toString 方法时，就会调用这个方法
let obj5 = {
  // [Symbol.toStringTag]: 'dylan'
  get [Symbol.toStringTag]() {
    return 'dylan'; // 和上面一样
  }
};
console.log(obj5.toString()); // [object dylan]

// !  11、Symbol.unscopables
const obj6 = {
  a: "a1",
  b: "b1"
};
// @ts-ignore
with(obj6) {
  console.log(a);
  console.log(b);
}
console.log(Array.prototype[Symbol.unscopables]); // 可以看到对象的哪些属性被过滤掉了
