class Bigger {

    constructor(dom, arr) {
        this.initHTML(dom);
        this.qsNode();
        this.initImg(arr);
        this.mouseIn();
        this. mouseOut();
        this.mouseMove();
    }

    initHTML(dom) {
        let str = `
    <div class="minbox">
    
    </div>
    <div class="smallbox">
    <img src="./img/1.webp" alt="">
    <span></span>
    </div>
    <div class="bigbox">
    <img src="./img/1.webp" alt="">
    </div>
        `;
        dom.innerHTML = str;
    }

    qsNode() {
        this.sbox = document.querySelector('.smallbox');
        this.bbox = document.querySelector('.bigbox');
        this.span = document.querySelector('span');
        this.bimg = document.querySelector('.bigbox img');
        this.simg = document.querySelector('.smallbox img');
        [this.sbw, this.sbh] = [this.sbox.offsetWidth, this.sbox.offsetHeight]
    }

    initImg(arr) {
        let minbox = document.querySelector('.minbox');
        let str = ``;
        for (let i = 0; i < arr.length; i++) {
            str += `<li><img src = '${arr[i]}'</li>`;
        }
        minbox.innerHTML = str;
        minbox.addEventListener('click', (e) => {

            // console.log(e.target.parentElement);
            // console.log(this.simg)
            this.simg.src = `${e.target.src}`;
            this.bimg.src = `${e.target.src}`;
            [...minbox.children].forEach((item)=>{
                item.style.border=null;
            });
            e.target.parentElement.style.border=`2px solid red`;
        })

    }

    mouseIn() {
        this.sbox.addEventListener('mouseover', (e) => {
            this.span.style.display = 'block';
            this.bbox.style.display = 'block';
            let wrate = this.bbox.offsetWidth / this.bimg.offsetWidth;
            let hrate = this.bbox.offsetHeight / this.bimg.offsetHeight;
            // console.log(sbw)
            this.span.style.width = wrate * this.sbw + 'px';
            this.span.style.height = hrate * this.sbh + 'px';
            // console.log(span.style.width)
        })
    }

    mouseOut() {
        this.sbox.addEventListener('mouseout', (e) => {
        this.span.style.display = 'none';
        this.bbox.style.display = 'none';
        })
    }

    mouseMove(){
        this.sbox.addEventListener('mousemove', (e) => {
            let [sw, sh] = [this.span.offsetWidth, this.span.offsetHeight];
            // console.log(sw, sh);

            let [x, y] = [e.clientX, e.clientY];
            // console.log(x,y)
            let left = x - (sw / 2);
            let top = y - (sh / 2);
            if (left >= (this.sbw - sw)) {
                left = this.sbw - sw;
            } else if (left <= 0) {
                left = 0;
            }
            if (top >= (this.sbh - sh)) {
                top = this.sbh - sh;
            } else if (top <= 0) {
                top = 0;
            }
            this.span.style.left = left + 'px';
            this.span.style.top = top + 'px';

            let [bbw, bbh] = [this.bbox.offsetWidth, this.bbox.offsetHeight]
            let movew = left / (this.sbw-sw);
            let moveh = top / (this.sbw-sh);
            // console.log(movew);

            this.bimg.style.left = -bbw * movew + 'px';
            this.bimg.style.top = -bbh * moveh + 'px';

        })
    }


}