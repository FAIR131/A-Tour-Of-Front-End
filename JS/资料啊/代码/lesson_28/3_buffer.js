/*
    后端语言 寄生 在系统当中
        - 调度CPU
        - 调度内存
    
    buffer属于内存
        - 静态内存(不可变不可改)
            - 系统的加载项
        - 随机内存(平常使用的)
            - 哪里有空自动寻找,寻找到以后,自动填入数据,返回内存编址
            - cache (缓存) 
                - 存储全局临时数据,系统关闭,缓存消失
            - buffer(缓冲)
                - 文件打开,缓冲启动,程序关闭,缓冲消失
                (vscode 1.js 在文件当中写入内容 , 不保存则保留在缓冲当中)

*/

/*
    Buffer不能再浏览器当中使用
*/

// let buf1 = Buffer.alloc(10); //创建一个长度为10字节的缓冲区
                            //找内存申请了一个10字节的空间

// console.log(buf1); //空的 内存的显示是16进制
/*

for(let i in buf1){
    console.log("->",buf1[i])
}
*/


// let buf2 = Buffer.allocUnsafe(10);//里面有可能会有内容

// console.log(buf2);


//
let buf3 = Buffer.from("I LOVE YOU");

console.log(buf3,buf3.length);

console.log(buf3.toString());
