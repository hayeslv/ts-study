// !Primise
// function getIndexPromise(bool) {
//   return new Promise<string>((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1);
//       if(bool) {
//         resolve('a');
//       } else {
//         reject(Error('error'));
//       }
//     }, 1000);
//   });
// }
// getIndexPromise(true).then((res) => {
//   console.log(res);
// }).catch(error => {
//   console.log(error);
// });

// async function asyncFunction() {
//   try {
//     const res = await getIndexPromise(false);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
// asyncFunction();

// !例子
interface Res {
  data: {
    [key: string]: any
  };
}
namespace axios {
  export function post(url: string, config: object): Promise<Res> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res: Res = { data: {} };
        if(url === '/login') {
          res.data.user_id = 111;
        } else {
          res.data.role = 'admin';
        }
        // console.log(2);
        resolve(res);
      }, 100);
    });
  }
}
interface Info {
  user_name: string;
  password: string;
}
async function loginReq({ user_name, password }: Info) {
  try {
    // console.log(1);
    const res = await axios.post('/login', {
      data: {
        user_name,
        password
      }
    });
    // console.log(3);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
async function getRoleReq(user_id: number) {
  try {
    const res = await axios.post('/user_roles', {
      data: {
        user_id,
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

loginReq({ user_name: 'dylan', password: '123' }).then(res => {
  const { data: { user_id } } = res;
  getRoleReq(user_id).then(res => {
    const { data: { role } } = res;
    // console.log(role);
  });
});

// !动态引入：调用getTime的时候，这个模块才会导入进来，不是编译时就导入
async function getTime(format: string) {
  const moment = await import('moment');
  return moment.default().format(format);
}
getTime('L').then(res => {
  // console.log(res); // 日期
});

// !弱类型探测：任何只包含可选属性的类型，都会被当作弱类型
interface ObjIn { // 两个参数都是可选的，这个就是弱类型
  name?: string;
  age?: number;
}
let objIn = {
  sex: 'man'
};
function printInfo(info: ObjIn) {
  // console.log(info);
}
// printInfo(objIn) // 类型“{ sex: string; }”与类型“ObjIn”不具有相同的属性。
printInfo(objIn as ObjIn);

// ...操作符
function mergeOptions(op1: object, op2: object) {
  return { ...op1, ...op2 };
}
function mergeOptions2<T, U extends string>(op1: T, op2: U) {
  return { ...op1, op2 };
}
// console.log(mergeOptions2({ a: 'a' }, 'name'));

// 要求传入的对象必须要有props这个属性名
function getExcludeProp<T extends { props: string }>(obj: T) {
  const { props, ...rest } = obj;
  return rest;
}
const obj = {
  props: 'something',
  name: 'dylan',
  age: 18
};
console.log(getExcludeProp(obj)); // {name: 'dylan', age: 18}











