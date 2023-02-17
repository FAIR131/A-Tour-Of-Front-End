class Swiper {
  constructor(dom, arr) {
    this.initHTML(dom);
    this.initImg(arr);
    this.qsNode();
    this.auto();
    this.mouseEvent();
    this.clickEvent();
    this.touchCir()
  }

  initHTML(dom) {
    let str = `
        <div class='box'>
        <ul class='img_list'></ul>
        <span class= 'left'><</span>
        <span class= 'right'>></span>
        <ul class='cir_list'></ul>
        </div>
        `;
    dom.innerHTML = str;
  }

  initImg(arr) {
    let img_list = document.querySelector(".img_list");
    let cir_list = document.querySelector(".cir_list");
    let stri = ``;
    for (let i = 0; i < arr.length; i++) {
      stri += `<li><img src = '${arr[i]}'</li>`;
    }
    img_list.innerHTML = stri;
    let str = ``;

    arr.forEach(() => {
      str += `<li></li>`;
    });

    cir_list.innerHTML = str;
  }

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

  mouseEvent() {
    this.box.addEventListener("mouseover", () => {
      this.left.style.display = "block";
      this.right.style.display = "block";
      clearInterval(this.si);
    });

    this.box.addEventListener("mouseout", () => {
      this.left.style.display = "none";
      this.right.style.display = "none";
      this.auto();
    });
  }

  clickEvent() {
    this.left.addEventListener("click", () => {
      this.setDefault(this.cir_lis, this.img_lis, this.index);
      this.index = this.index <= 0 ? this.cir_lis.length - 1 : this.index - 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);
    });

    this.right.addEventListener("click", () => {
      this.setDefault(this.cir_lis, this.img_lis, this.index);
      this.index = this.index >= this.cir_lis.length - 1 ? 0 : this.index + 1;
      this.setStyle(this.cir_lis, this.img_lis, this.index);
    });
  }

  touchCir() {
    this.cir_lis.forEach((item, ind)=> {
       
      item.onmouseover = () => { 
     
        this.setDefault(this.cir_lis, this.img_lis, this.index);

        this.setStyle(this.cir_lis, this.img_lis, ind);
        this.index = ind;
      };
    });
  }


}
