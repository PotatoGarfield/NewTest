function book(name, price) {
  this.name = name;
  this.price = price;
}

book.prototype.showPrice =  function() {
  i = this.price;
  console.log(this.price);
  console.log(i,'2');
  return 'asd';
}

let a = new book('a', 1);
let b = new book('b', 2);
console.log(a.showPrice());
console.log(b.showPrice());