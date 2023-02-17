class Axios {
    constructor(method, url, parmas, dataType) {
        this.method = method;
        this.requeatUrl = url;
        this.parmas = parmas;
        this.dataType = dataType;
        //method string
        //url string
        //params object
        if (!this.valiType()) return
        if (!this.valiMethod()) return
    }
    get() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            let url = `${this.requeatUrl}?${this.parmaConcat(this.parmas)}`
            xhr.open(this.method, url);
            xhr.send(this.parmas);
            xhr.onerror = function (err) {
                reject(err)
            }

            xhr.onreadystatechange =(response)=> {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    if(this.dataType === 'text'){
                        resolve(response.target.response)
                    }else if(this.dataType === 'json'){
                        resolve(JSON.parse(response.target.response))
                    }
                }
            }
        })
    }

    post() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            let url = `${this.requeatUrl}?${this.parmaConcat(this.parmas)}`
            xhr.open(this.method,this.requeatUrl);
            xhr.send(this.parmas);
            xhr.onerror = function (err) {
                reject(err)
            }

            xhr.onreadystatechange = (response)=> {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    if(this.dataType === 'text'){
                        resolve(response.target.response)

                    }else if(this.dataType === 'json'){
                        resolve(JSON.parse(response.target.response))
                    }
                }
            }
        })
    }

    //url拼接
    parmaConcat(arg) {
        let str = ``;
        for (let k in arg) {
            str += `&${k}=${arg[k]}`//&name=ton&age=18
        }

        return str.slice(1);//name=ton&age=18
    }

    //检测参数数据类型
    valiType() {
        if (!Axios.typeof(this.method, '[object String')) {
            console.error('me cuo la')
            return false
        }
        if (!Axios.typeof(this.requeatUrl, '[object String')) {
            console.error('req cuo la')

            return false
        }
        if (!Axios.typeof(this.dataType, '[object String')) {
            console.error('req cuo la')

            return false
        }
        if (!Axios.typeof(this.parmas, '[object Object')) {
            console.error('par cuo la')

            return false
        }

        return true

    }

    valiMethod() {
        //允许的请求方式
        let methods = ['get', 'post', 'put', 'patch', 'delete', 'option'];
        if (methods.includes())
        {

        }

        return true
    }

    static typeof(arg, type) {
        return Object.prototype.toString.call(arg) === type
    }
}