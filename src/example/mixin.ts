// !对象的混入
interface ObjectA {
  a: string;
}
interface ObjectB {
  b: string;
}
let Aa: ObjectA = {
  a: 'a'
};
let Bb: ObjectB = {
  b: 'b'
};
let Ab = Object.assign(Aa, Bb);
// console.log(Ab);

// !类的混入
class ClassAa {
  public isA: boolean;
  public funcA() {}
}
class ClassBb {
  public isB: boolean;
  public funcB() {}
}
class ClassAB implements ClassAa, ClassBb {
  public isA: boolean = false;
  public isB: boolean = false;
  constructor() {}
  public funcA: () => void;
  public funcB: () => void;
}
function mixins(base: any, from: any[]) {
  from.forEach(fromItem => {
    Object.getOwnPropertyNames(fromItem.prototype).forEach(key => {
      console.log(key);
      base.prototype[key] = fromItem.prototype[key];
    });
  });
}
mixins(ClassAB, [ClassAa, ClassBb]);
const ab = new ClassAB();
console.log(ab);











