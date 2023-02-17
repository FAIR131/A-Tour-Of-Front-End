// 通过ref方法声明一个简单类型数据,得到的是一个代理对象
import {computed, ref,watch, watchEffect} from "vue";
export let num = ref(10);
export let changeNum = function () {
    // console.log(num)
    // 通过ref声明的num是一个代理对象,可以直接渲染在页面,但修改值时要修改它的value属性
    num.value++
}

//直接侦听一个ref变量
watch(num,(newVal,oldVal)=>{
    console.log(newVal,oldVal)
})


//watchEffect在首次渲染时就会触发执行，而watch不会
watchEffect(()=>{
    //  此处的num因为是一个数据项，所以他是watchEffect的依赖数据
    document.title=num.value
})

export let plusNum =  computed(()=>num.value*2)
