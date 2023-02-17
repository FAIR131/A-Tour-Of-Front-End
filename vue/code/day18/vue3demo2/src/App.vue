<template>
<!--  <input type="text" name="" id="" @input="search">-->

  <!--  <ul>
      <li v-for="item in girls" :key="item.key">{{item.name}}</li>
    </ul>-->

<!--  <p ref="myPNode">vue3真简单</p>-->
  <!--  <child :money="98" @getMoney="getMoney"></child>-->
<!--  <child ref="myChild" :money="98" @getMoney="getMoney"></child>-->
<!--  <button @click="getRef">获取引用</button>-->
<!--    <life-cycle></life-cycle>-->
<!--   <Mask></Mask>-->
  <Candy></Candy>
</template>

<script>
import {debounce} from 'lodash'
import child from "@/components/child.vue";
import LifeCycle from "@/components/LifeCycle.vue";
import {ref} from "vue"
import Mask from "@/components/mask.vue";
import Candy from "@/components/Candy.vue"

export default {
  mounted() {
    // console.log(debounce)
  },
  components: {
    child,
    LifeCycle,
    Mask,
    Candy
  },
  /*data(){
    return{
      girls:[
        {name:"昭君",key:"xiaowang"},
        {name:"貂蝉",key:"diaochan"},
        {name:"西施",key:"xishi"},
        {name:"玉环",key:"xiaoyang"}
      ]
    }
  },*/
  methods: {
    //使用lodash添加防抖效果
    search: debounce(function (e) {
      console.log(e.target.value)
    }, 1000)
  },
  setup() {
    //ref声明的变量可以赋值给标签或子组件的ref属性
    let myPNode = ref(null)//本质是reactive({value:null})
    let myChild = ref(null)

    let getMoney = function (params) {
      console.log('孝敬钱', params)
    }

    let getRef = function () {
      console.log(myPNode.value.innerHTML)
    }

    return {
      getMoney, getRef, myPNode, myChild
    }
  }
}
</script>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
