class Dialog {

    static #instance = null;


    constructor() {
        //最大的盒子
        if (!Dialog.#instance) {
            this.dialog = document.createElement("div");

            //不同操作的样式
            this.list = [
                {
                    name: "success",//成功
                    descText: "成功",
                    bgColor: "green"

                },
                {
                    name: "danger",
                    descText: "危险",
                    bgColor: "red"

                },
                {
                    name: "warning",
                    descText: "警告",
                    bgColor: "orange"

                },
                {
                    name: "default",//成功
                    descText: "提示",
                    bgColor: "#fff"

                },
                {
                    name: "info",//成功
                    descText: "信息",
                    bgColor: "skyblue"

                },
            ]

            Dialog.#instance = this;
        }else{
            return Dialog.#instance;
        }

        this.single();

    }

    single() {
        this.createHTML();
        this.setCss();
        this.bindEvent();
    }

    //创捷节点
    createHTML() {
        //顶部
        this.top = document.createElement("div");
        this.desc = document.createElement("p");
        this.desc.innerText = "信息";
        this.span = document.createElement("span");
        this.span.innerText = "x";
        this.top.appendChild(this.desc);
        this.top.appendChild(this.span);
        //中间
        this.content = document.createElement("div");
        this.content.innerText = "你好";
        //底部
        this.bottom = document.createElement("div");
        this.btn = document.createElement("button");
        this.btn.innerText = "确定";
        this.bottom.appendChild(this.btn);
        //放置到大盒子里面
        this.dialog.appendChild(this.top);
        this.dialog.appendChild(this.content);
        this.dialog.appendChild(this.bottom);

        document.body.appendChild(this.dialog);
    }
    //设置css
    setCss() {
        Dialog.setStyles(this.dialog, {
            width: "600px",
            height: "360px",
            "border-top": "1px solid #ccc",
            "border-left": "1px solid #ccc",
            "box-shadow": "1px 20px 20px 0px #ccc",
            "background-color": "#fff",
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            margin: "auto",
            display: "flex",
            "flex-direction": "column",
            "justify-content": "space-between",
            opacity: "0",
            transform: "translateY(-200px)",
            transition: "all 0.3s linear",
        });

        Dialog.setStyles(this.top, {
            height: "45px",
            "background-color": "skyblue",
            display: "flex",

            "box-sizing": "border-box",
            "justify-content": "space-between",
            padding: "0 20px",
            "align-items": "center",
            "border-bottom": "1px solid #ccc",
        });

        Dialog.setStyles(this.content, {
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            "font-size": "30px"
        })

        Dialog.setStyles(this.bottom, {
            height: "45px",
            display: "flex",

            "justify-content": "center",
            "align-items": "center",
            "border-top": "1px solid #ccc"

        })


    }

    //绑定事件
    bindEvent() {
        this.btn.onclick = this.span.onclick = () => {
            this.dialog.style.opacity = 0;
            this.dialog.style.transform = "translateY(-200px)";

        }

    }

    static setStyles(ele, styles) {
        for (let k in styles) {
            ele.style[k] = styles[k];
        }
    }

}

const diglog = new Dialog();

