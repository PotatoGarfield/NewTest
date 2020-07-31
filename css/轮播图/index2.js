/* 
  使用 es6 的 class 来对于多个轮播图进行对应，使其组件化
*/
class Carousel {
  constructor(root, animation) {
    this.root = root;
    // 补充 html 代码
    this.ready();

    // 动画参数
    this.animation = animation || (fromNode, toNode, callback => callback());
    this.dotsCt = root.querySelector('.dots');
    this.dots = Array.from(root.querySelectorAll('.dots > span'));
    this.panels = Array.from(root.querySelectorAll('.panels > a'));
    this.pre = root.querySelector('.pre');
    this.next = root.querySelector('.next');

    // 节流，防止多次快速点击“上下页”
    this.flag = true;

    this.bind();
  }

  /* 使用 get 将对象属性绑定到查询该属性时将被调用的函数 */
  get index() {
    return this.dots.indexOf(this.root.querySelector('.carousel .dots .active'));
  }

  get preIndex() {
    return (this.index - 1 + this.dots.length) % this.dots.length;
  }

  get nextIndex() {
    return (this.index + 1) % this.dots.length;
  }

  ready() {
    this.root.insertAdjacentHTML('beforeend',
      `<!-- 操作部分 -->
      <div class="action">
        <span class="pre">上一页</span>
        <span class="next">下一页</span>
        <!-- 指示器（小圆点） -->
        <div class="dots">
          <span class="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>`
    )
  }

  bind() {
    this.dotsCt.onclick = e => {
      // 防止点到空白处触发切换
      if (e.target.tagName !== 'SPAN') return;
      // 获取点击的小点下标
      let index = this.dots.indexOf(e.target);
      this.changeImg(index, this.index);
    }

    // 点击上一页的方法监听
    this.pre.onclick = e => {
      if (this.flag){
        this.flag = false;
        this.changeImg(this.preIndex, this.index);
      } else {
        return;
      }
    }

    // 点击上一页的方法监听
    this.next.onclick = e => {
      if (this.flag){
        this.flag = false;
        this.changeImg(this.nextIndex, this.index);
      } else {
        return;
      }
    }
  }

  // 切换
  changeImg(toIndex, fromIndex) {
    this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
      // 图片切换
      this.panels.forEach(panel => panel.style.zIndex = 1);
      this.panels[toIndex].style.zIndex = 10;
      // 小点动效
      this.dots.forEach(dot => dot.classList.remove('active'));
      this.dots[toIndex].classList.add('active');
      // 节流归位
      this.flag = true;
    });
  }
}

/* 
  渐变动效
*/
function fade(fromNode, toNode, onFinish) {
  let opacityOffset1 = 1;
  let opacityOffset2 = 0;
  let step = 0.04;
  // 将图片全部隐藏，防止在动效出现的时候出现三张图片混淆
  this.panels.forEach(panel => panel.style.opacity = 0);

  fromNode.style.zIndex = 10;
  toNode.style.zIndex = 9;

  function fromNodeAnimation() {
    if (opacityOffset1 > 0) {
      opacityOffset1 -= step;
      fromNode.style.opacity = opacityOffset1;
      requestAnimationFrame(fromNodeAnimation);
    } else {
      fromNode.style.opacity = 0;
    }
  }

  function toNodeAnimation() {
    if (opacityOffset2 < 1) {
      opacityOffset2 += step;
      toNode.style.opacity = opacityOffset2;
      requestAnimationFrame(toNodeAnimation);
    } else {
      toNode.style.opacity = 1;
      onFinish();
    }
  }

  fromNodeAnimation();
  toNodeAnimation();
}

/* 
  平移动效
*/
function slide(fromNode, toNode, onFinish) {
  fromNode.style.zIndex = 10;
  toNode.style.zIndex = 10;

  let width = parseInt(getComputedStyle(fromNode).width);
  let offsetX = width;
  let offset1 = 0;
  let offset2 = 0;
  let step = 10;

  // 向左平移
  function fromNodeAnimation() {
    if (offset1 < offsetX) {
      fromNode.style.left = parseInt(getComputedStyle(fromNode).left) - step + 'px';
      offset1 += step;
      requestAnimationFrame(fromNodeAnimation);
    }
  }
  function toNodeAnimation() {
    if (offset2 < offsetX) {
      toNode.style.left = parseInt(getComputedStyle(toNode).left) - step + 'px';
      offset2 += step;
      requestAnimationFrame(toNodeAnimation);
    } else {
      fromNode.style.left = 0;
      toNode.style.left = 0;
      onFinish();
    }
  }

  // 向右平移
  function fromNodeAnimation2() {
    if (offset1 < offsetX) {
      fromNode.style.left = parseInt(getComputedStyle(fromNode).left) + step + 'px';
      offset1 += step;
      requestAnimationFrame(fromNodeAnimation2);
    }
  }
  function toNodeAnimation2() {
    if (offset2 < offsetX) {
      console.log(offset2);
      toNode.style.left = parseInt(getComputedStyle(toNode).left) + step + 'px';
      offset2 += step;
      requestAnimationFrame(toNodeAnimation2);
    } else {
      fromNode.style.left = 0;
      toNode.style.left = 0;
      onFinish();
    }
  }

  // 根据 index 计算偏移方向
  if (this.panels.indexOf(fromNode) < this.panels.indexOf(toNode)) {
    // 将下一个面板放到当前面板的右边
    toNode.style.left = width + 'px';
    fromNodeAnimation();
    toNodeAnimation();
  }
  if (this.panels.indexOf(fromNode) > this.panels.indexOf(toNode)) {
    // 将下一个面板放到当前面板的左边
    toNode.style.left = - width + 'px';
    fromNodeAnimation2();
    toNodeAnimation2();
  }
}

document.querySelectorAll('.carousel').forEach(e => new Carousel(e, slide));