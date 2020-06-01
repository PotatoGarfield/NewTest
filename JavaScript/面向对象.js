function book(name, price) {
  this.name = name;
  this.price = price;
}

/* 在 prototype 的例子里，printTitle 函数只会创建一次，
 在所有实例中共享。如果在类的定义里声明，就像前面的例子一样，
 则每个实例都会创建自己的函数副本。 */
book.prototype.showPrice =  function() {
  i = this.price;
  console.log(this.price);
  return 'price';
}

let a = new book('a', 1);
let b = new book('b', 2);
console.log(a.showPrice());
console.log(b.showPrice());