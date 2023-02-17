class Swiper {
  constructor(dom, arr) {
    this.initHTML(dom);
    this.initImg(arr);
    this.qsNode();
    this.auto();
    this.mouseEvent();
    this.clickEvent();
    this.touchCir();
  }

  initHTML(dom) {
    let str = `
    <div class="box">
    <ul class="img_list"></ul>
    <ul class="cir_list"></ul>
    <span class="left"><</span>
    <span class="right">></span>
    </div>    
    `;
    dom.innerHTML = str;
  }

  initImg(arr) {
    let img_list = document.querySelector(".img_list");
    let cir_list = document.querySelector(".cir_list");
    let str = ``;
    arr.forEach((item) => {
      str += `<li><img src='${item}'</li>`;
    });
    img_list.innerHTML = str;

    let stri = ``;
    arr.forEach((item) => {
      stri += `<li></li>`;
    });
    cir_list.innerHTML = stri;
  }

  qsNode() {
    this.img_lis = document.querySelectorAll(".img_list li");
    this.cir_lis = document.querySelectorAll(".cir_list li");
    this.box = document.querySelector(".box");
    [this.left, this.right] = document.querySelectorAll("span");
    this.index = 0;
  }

  setDefault(obj1, obj2, index) {
    obj1[index].style.backgroundColor = "white";
    obj2[index].style.display = "none";
  }
  setStyle(obj1, obj2, index) {
    obj1[index].style.backgroundColor = "orangered";
    obj2[index].style.display = "block";
  }

  auto() {
    this.si = setInterval(() => {
      this.setDefault(this.cir_lis, this.img_lis, this.index);
      this.index = this.index >= this.cir_lis.length - 1 ? 0 : this.index + 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);
    }, 1000);
  }

  mouseEvent() {
    this.box.addEventListener("mouseover", () => {
      this.left.style.opacity = 1;
      this.right.style.opacity = 1;
      clearInterval(this.si);
    });
    this.box.addEventListener("mouseout", () => {
      this.left.style.opacity = 0;
      this.right.style.opacity = 0;
      this.auto();
    });
  }

  clickEvent() {
    this.right.onclick = () => {
      this.setDefault(this.cir_lis, this.img_lis, this.index);
      this.index = this.index >= this.cir_lis.length - 1 ? 0 : this.index + 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);
    };
    this.left.onclick = () => {
      this.setDefault(this.cir_lis, this.img_lis, this.index);
      this.index = this.index <= 0 ? this.cir_lis.length - 1 : this.index - 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);
    };
  }

  touchCir(item,ind) {
    this.cir_lis.forEach((item, ind)=> {      
        item.onmouseover = () => {      
          this.setDefault(this.cir_lis, this.img_lis, this.index);
          this.setStyle(this.cir_lis, this.img_lis, ind);
          this.index = ind;
        };
      });
  }
}
