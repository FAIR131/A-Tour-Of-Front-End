/*15.封装一个函数API

chunk([2,3,4,5],2)-----[[2,3],[4,5]]

chunk([2,3,4,5],3)------[[2,3,4],[5]]*/
const test1 = {
    chunk(arr, num) {
        if (arr.length === 0) {
            return [];
        }
        let newArr = [];
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            // 这里先推入temp再往temp中推入元素
            // 判断temp元素长度是否为0
            if (temp.length === 0) {
                newArr.push(temp);
            }
            // 将元素压入到临时数组temp中
            temp.push(arr[i]);
            // temp满了就清空
            if (temp.length === num) {
                temp = [];
            }
        }
        return newArr
    }
}
export default test1