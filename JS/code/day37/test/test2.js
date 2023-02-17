/*
reshape([1,2,3,4,5,6],shape=[2,3])-------->[[1,2,3],[4,5,6]]
reshape([1,2,3,4,5,6],shape=[3,2])-------->[[1,2],[3,4],[5,6]]
reshape([1,2,3,4,5,6],shape=6) ------------>[1,2,3,4,5,6]
reshape([1,2,3,4,5,6],shape=[6]) ------------>[[1,2,3,4,5,6]]
reshape([1,2,3,4,5,6],shape=[5]) ------------>error
*/
const test2 = {
    reshape(arr, shape) {
        if (arr.length === 0 || shape === null) {
            return [];
        }
        let newArr = [];
        let temp = [];
        if (shape instanceof Array) {
            let sum = 1
            for (let i = 0; i < shape.length; i++) {
                sum *= shape[i];
            }
            if (arr.length % sum !== 0) {
                return 'error'
            }
            if (shape.length === 1) {
                newArr = [arr]
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (temp.length === 0) {
                        newArr.push(temp);
                    }
                    temp.push(arr[i]);
                    if (temp.length === shape[1]) {
                        temp = [];
                    }
                }
            }
        } else {
            newArr = arr
        }
        return newArr
    }
}
export default test2