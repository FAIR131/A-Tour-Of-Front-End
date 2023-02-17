
new Promise((resolve,reject)=>{
    console.log(1);
    resolve(undefined);
}).then(value=>{
    console.log(2); 
})

setTimeout(()=>{
    console.log(3);   
})
console.log(4); //1 4 2 3

