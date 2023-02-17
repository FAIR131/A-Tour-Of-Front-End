class Swiper {
  constructor(dom, arr) {
    this.initHTML(dom);
    this.initSrc(arr);
    this.qsNode();
    // this.setDefault();
    // this.setStyle();
    this.auto();
    this.mousein();
    this.mouseout();
    this.touchCir();
    this.rightClick();
    this.leftClick();
  }

  initHTML(dom) {
    let str = `<div class='box'>
        <ul class='img_list'></ul>
        <span class='left'><</span>
        <span class='right'>></span>
        <ul class='cir_list'></ul>
        </div>
        `;
    dom.innerHTML = str;
  }

  initSrc(arr) {
    let img_ul = document.querySelector(".img_list");
    let cir_ul = document.querySelector(".cir_list");
    let str = ``;
    arr.forEach((src) => {
      str += `<li><img src='${src}'></li>`;
    });
    img_ul.innerHTML = str;

    let stri = ``;
    arr.forEach(() => {
      stri += `<li></li>`;
    });
    cir_ul.innerHTML = stri;
  }

  //   取标签
  qsNode() {
    this.box = document.querySelector(".box");
    this.img_lis = document.querySelectorAll(".img_list li");
    this.cir_lis = document.querySelectorAll(".cir_list li");

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


  touchCir() {
    this.cir_lis.forEach((item, ind)=> {
      item.onmouseover =  () =>{
        this.setDefault(this.cir_lis, this.img_lis, this.index);
        this.setStyle(this.cir_lis, this.img_lis, ind);
        this.index = ind;
      };
    });
  }



  mousein() {
   this.box.onmouseover = () => {
      this.left.style.display = "block";
      this.right.style.display = "block";
      clearInterval(this.si);
    };
  }

  mouseout() {
    this.box.onmouseout = () => {
      this.left.style.display = "none";
      this.right.style.display = "none";
      this.auto();
    };
  }

  rightClick() {
    this.right.addEventListener("click",  () =>{
        this.setDefault(this.cir_lis, this.img_lis, this.index);
        this.index = this.index >= this.cir_lis.length - 1 ? 0 : this.index + 1;
        this.setStyle(this.cir_lis, this.img_lis, this.index);
    });
  }

  leftClick() {
    this.left.addEventListener("click",()=> {
        this.setDefault(this.cir_lis, this.img_lis, this.index);

      this.index = this.index <= 0 ? this.cir_lis.length - 1 :this.index - 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);

    });
  }

}
