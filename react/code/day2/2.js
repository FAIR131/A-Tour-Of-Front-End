let arr1 = [1, 2, 3, 4, [5, 6, 7]];//[1,2,3,4,0x0000?]

let arr2 = [];
(function () {
    for (let i = 0; i < arr1.length; i++) {
        //把arr1当中的内容一个一个的赋值给arr2
        arr2[i] = arr1[i];
        212
    }
})()

//修改arr2
arr2[0] = 100;
console.log(arr2);//[100, 2, 3, 4, [50,6,7]]
console.log(arr1);//[1, 2, 3, 4, [50,6,7]]

arr2[4][0] = 50
console.log(arr1);//[1, 2, 3, 4,[50,6,7]]
