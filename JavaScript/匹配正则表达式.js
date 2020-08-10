let a = `"name":"jay"`;
if (/"name":"([a-z]*)"/.test(a)) {
  console.log(RegExp.$1);
}

var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter (\d+(\.\d)*))/i;
var found = str.match(re);

console.log(found);