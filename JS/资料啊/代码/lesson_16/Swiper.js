
class Swiper {
    //类被实例化的，自动调用
    constructor(dom,arr){
        // super()
        this.initHTML(dom);
        this.initSrc(arr);
        this.start();
    }

    //初始化HTML
    initHTML(dom) {
        let str = `<div id="box">
                    <ul class="list"> 
                    </ul>
                    <span class="left"> < </span>
                    <span class="right"> > </span>

                    <ul class="iconlist">
                    </ul>
                </div>`
        dom.innerHTML = str;
    }

    //生成li和img,并且把src全部放置
    initSrc(arr) {
        let ul = document.querySelector("#box .list");
        let ul_ = document.querySelector("#box .iconlist");

        //图片的长度是根据arr定义的
        //字符拼接
        let str = ``;
        arr.forEach(src => {
            str += `<li><img src="${src}"></li>`;
        });

        ul.innerHTML = str;

        //生成小圆点的长度根据图片数量定义的
        let stri = ``
        arr.forEach(src => {
            stri += `<li></li>`;
        });
        ul_.innerHTML = stri;
    }

    //一个函数只做一件事
    start() {
        let lis = document.querySelectorAll(".list > li");
        //初始化的索引
        let index = 0;

        //找到所有的iconlist下面的li标签
        let ioli = document.querySelectorAll(".iconlist > li");

        //找到范围
        let box = document.querySelector("#box");

        //找到箭头
        let [left, right] = document.querySelectorAll("span");

        /*打包*/
        function setDefault(obj1, obj2, index) {
            obj1[index].style.backgroundColor = "white";
            obj2[index].style.display = "none";
        }

        function setStyle(obj1, obj2, index) {
            obj1[index].style.backgroundColor = "orangered";
            obj2[index].style.display = "block";
        }

        let si;

        function auto() {
            si = setInterval(function () {
                setDefault(ioli, lis, index);

                index = index >= lis.length - 1 ? 0 : index + 1;

                setStyle(ioli, lis, index);
            }, 2000)
        }

        auto();

        box.onmouseover = function () {
            //显示箭头
            left.style.opacity = 1;
            right.style.opacity = 1;

            clearInterval(si);
        }
        box.onmouseout = function () {
            //隐藏箭头
            left.style.opacity = 0;
            right.style.opacity = 0;

            auto();
        }
        for (let i = 0; i < ioli.length; i++) {
            ioli[i].onmouseover = function () {
                //选中了谁,谁的颜色就要发生变化
                //过滤之前的
                setDefault(ioli, lis, index);

                //显示现在的
                setStyle(ioli, lis, i);

                //更新索引
                index = i;
            }
        }

        left.onclick = function () {
            //过滤之前的样式
            setDefault(ioli, lis, index);

            index = index <= 0 ? lis.length - 1 : index - 1;

            //显示现在的
            setStyle(ioli, lis, index);
        }


        right.onclick = function () {
            //过滤之前的样式
            setDefault(ioli, lis, index);

            index = index >= lis.length - 1 ? 0 : index + 1;

            //显示现在的
            setStyle(ioli, lis, index);
        }



    }


}


