/* 第一版简单的实现 */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// 切换
changeImg = index => {
  // 小点动效
  $$('.carousel .dots > span').forEach(dot => dot.classList.remove('active'));
  $$('.carousel .dots > span')[index].classList.add('active');
  // 图片切换
  $$('.carousel .panels > a').forEach(panel => panel.style.zIndex = 1);
  $$('.carousel .panels > a')[index].style.zIndex = 10;
}

// 点击指示器的方法监听
$('.carousel .dots').onclick = function (e) {
  // 防止点到空白处触发切换
  if (e.target.tagName !== 'SPAN') return;

  // 获取点击的小点下标
  let index = Array.from($$('.carousel .dots > span')).indexOf(e.target);
  changeImg(index);
}

// 点击上一页的方法监听
$('.carousel .pre').onclick = e => {
  let index = Array.from($$('.carousel .dots > span')).indexOf($('.carousel .dots .active'));
  index = (index - 1 + $$('.carousel .dots > span').length) % $$('.carousel .dots > span').length;
  changeImg(index);
}

// 点击上一页的方法监听
$('.carousel .next').onclick = e => {
  let index = Array.from($$('.carousel .dots > span')).indexOf($('.carousel .dots .active'));
  index = (index + 1) % $$('.carousel .dots > span').length;
  changeImg(index);
}