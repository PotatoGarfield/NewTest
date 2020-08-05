// setTimeout 的超时延迟
// 第一种
function foo() {
  console.log('foo has been called');
}
setTimeout(foo);
console.log('After setTimeout');

// 第二种
for(var i = 0; i < 6; i++) {
  setTimeout(
    () => console.log(i)
  )
}

let a = {
  _a : '123'
}
a._a = '222';
console.log(a._a);