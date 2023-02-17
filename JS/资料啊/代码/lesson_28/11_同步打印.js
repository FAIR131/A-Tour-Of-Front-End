const fs = require("fs");
let path = "C:/Users/ruidong/Desktop/code/";
let pathTree = "/";
function rec(path,level=0){
    level++  
    let sign = "----";
    let files = fs.readdirSync(path);
    files.forEach(item=>{
        //"C:/Users/ruidong/Desktop/code/lesson_24
        let cpath = `${path}/${item}`;
        let statObj = fs.statSync(cpath);

        pathTree += `\n${sign.repeat(level)}${item}`;

        if(statObj.isDirectory()){//true
            rec(cpath,level);
        }
    })

}

rec(path);

console.log(pathTree);


