enum Status {
  Uploading,
  Success,
  Failed,
}
console.log(Status.Uploading); // 默认是第一个是 0，可以指定
// tslint:disable-next-line: no-string-literal
console.log(Status["Uploading"]);

// !反向映射
// 一个枚举不仅可以通过字段名来得到值，还可以通过值得到字段名

// !字符串枚举
enum Message {
  Error = 'Sorry, error',
  Success = 'haha, success',
  Failed = Error
}
console.log(Message.Success); // haha, success
console.log(Message.Failed); // Sorry, error

// !异构枚举：包含数字和字符串
enum Result {
  Failed = 0,
  Success = 'success',
}

// !枚举成员类型和联合枚举类型
// 1. enum E { A }
// 2. enum E { A = 'a' }
// 3. enum E { A = 1 }
// 满足上面三种，那这个枚举或者它的成员就可以作为类型来使用

enum Animals {
  Dog = 1,
  Cat = 2,
}
interface Dog {
  type: Animals.Dog;
}
const dog: Dog = {
  type: Animals.Dog
};

// 联合枚举类型
enum Status {
  Off = 0,
  On
}
interface Light {
  status: Status;
}
const light: Light = {
  status: Status.Off
};

// 如果使用了const，则编译时不会再有 Animals1 这个对象了
const enum Animals1 {
  Dog = 1,
}

