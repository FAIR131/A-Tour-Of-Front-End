/*
    promise版本的ajax
    get  post
*/
(function () {
    class Axios {

        params(url, dataType, parmas){
            this.requestUrl = url;
            this.parmas = parmas;
            this.dataType = dataType;
            
            //method必须是string类型
            //url 必须是string类型
            //params 必须是Object类型
            if (!this.valiType()) return //false-->true
        }

        get(url, dataType, parmas) {
            this.params(url, dataType, parmas);
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                //http://127.0.0.1/index?name=tom&age=18
                let url = `${this.requestUrl}?${this.paramConcat(this.parmas)}`;
                xhr.open("get", url);
                xhr.send();
                xhr.onerror = function (err) {
                    reject(err);
                }
                xhr.onreadystatechange = (response) => {
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                        //加入别人返回文本
                        //返回的不是JSON
                        if (this.dataType.toLowerCase() === "text") {
                            resolve(response.target.response);
                        } else if (this.dataType.toLowerCase() === "json") {
                            resolve(JSON.parse(response.target.response));
                        }

                    }
                }
            })
        }

        post(url, dataType, parmas) {
            this.params(url, dataType, parmas);
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("post", this.requestUrl);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(this.paramConcat(this.parmas));//
                xhr.onerror = function (err) {
                    reject(err);
                }
                xhr.onreadystatechange = (response) => {
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                        //加入别人返回文本
                        //返回的不是JSON
                        if (this.dataType.toLowerCase() === "text") {
                            resolve(response.target.response);
                        } else if (this.dataType.toLowerCase() === "json") {
                            resolve(JSON.parse(response.target.response));
                        }

                    }
                }
            })
        }

        //参数拼接
        paramConcat(arg) {
            let str = ``;
            for (let k in arg) {//&name=tom&age=18
                str += `&${k}=${arg[k]}`
            }

            return str.slice(1);//name=tom&age=18
        }


        //检测参数的数据类型
        valiType() {
            if (!Axios.typeof(this.requestUrl, "[object String]")) {//false
                console.error("the url not a String");
                return false
            }

            if (!Axios.typeof(this.dataType, "[object String]")) {//false
                console.error("the url not a String");
                return false
            }

            if (!Axios.typeof(this.parmas, "[object Object]")) {//false
                console.error("the params not a Object");
                return false
            }

            return true

        }

        static typeof(arg, type) {
            return Object.prototype.toString.call(arg) === type;
        }
    }

    window.axios = window.$ = new Axios();
})()


