class Dialog {
    static #instance = null;

    constructor() {
        //最大盒子
        if (!Dialog.#instance) {
            this.box = document.createElement('div');

            //    不同操作的样式
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
                }
            ]
            Dialog.#instance = this;
        } else {
            return Dialog.#instance;
        }
        this.single();
    }

    single() {
        this.creatHTML();
        this.setCss();
        this.bindEvent();
        this.delEvent();
    }

    //创建节点
    creatHTML() {
        document.body.append(this.box);


        //    顶部
        this.top = document.createElement('div');
        this.info = document.createElement('p');
        this.span = document.createElement('span');
        this.top.append(this.info);
        this.top.append(this.span);
        this.box.append(this.top);
        this.info.innerText = '信息';
        this.span.innerText = 'X';

        //    中间
        this.content = document.createElement('div');
        this.content.innerText = '你好';
        this.box.append(this.content)

        //    底部
        this.bottom = document.createElement('div');
        this.btn = document.createElement('button');
        this.btn.innerText = '确定';
        this.bottom.append(this.btn);
        this.box.append(this.bottom);


    }

    //设置样式
    setCss() {
        Dialog.setStyle(this.box, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            transform: 'translateY(-200px)',
            width: '600px',
            height: '360px',
            border: '1px solid #ccc',
            'box-shadow': '1px 20px 20px 0px #ccc',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between',
            'align-items': 'center',
            opacity: '0',
            transition: 'all 0.3s linear',
        });

        Dialog.setStyle(this.top, {
            height: '45px',
            width: '100%',
            display: 'flex',
            'justify-content': 'space-between',
            'background-color': 'skyblue',
            padding: '0 10px',
            'box-sizing': 'border-box',
            'line-height': '45px',
        });

        Dialog.setStyle(this.content, {
            'font-size': '30px',
        });

        Dialog.setStyle(this.bottom, {
            width: '100%',
            height: '45px',
            'border-top': '1px solid #ccc',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
        });


    }

    //绑定事件
    bindEvent() {
        this.btn.onclick = this.span.onclick = () => {
            this.box.style.opacity = 0;
            this.box.style.transform = 'translateY(-200px)';
        }
    }

    delEvent() {
        let del = document.createElement('button');
        del.innerText = '删除';
        document.body.append(del);
        del.onclick = () => {
            this.box.style.opacity = 1;
            this.box.style.transform = 'translateY(0px)';
        }
    }


    static setStyle(ele, styles) {
        for (let k in styles) {
            ele.style[k] = styles[k];
        }
    }


}