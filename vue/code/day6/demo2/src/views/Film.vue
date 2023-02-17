<template>
<div>
  <div>

<!--    <button @click="watchScore">查看积分</button>-->

    <ul class="topMenu">
      <li>
        <router-link to="/film/hotfilm"> 正在热映</router-link>
      </li>
      <li>
        <router-link to="/film/newfilm"> 即将上映</router-link>
        </li>
    </ul>

    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: "Film",
  methods:{
    watchScore(){
      //编程式导航
      // console.log(this.$router)
      // this.$router.push('/mine');
      // replace是将目标页面的路由在栈中替换当前页的记录
      // 通过query方式跳转到目标页面后,可以通过路由对象中的currentRoute中的query去获取
      this.$router.replace({path:'/mine',query:{username:'zs',age:18}})
    }
  },
  beforeRouteEnter(to,from,next){
    // beforeRouteEnter路由守卫在页面创建之前调用,此时this没有值
    // 在next函数中可以传一个回调函数,回调函数的形参就是当前页面的实例
    next((instance)=>{
      // console.log(instance)
    })
  },
  beforeRouteUpdate(to,from,next){
    // beforeRouteUpdate在页面显示时不会触发,在路由改变时会触发

    next()
  },
  beforeRouteLeave(to,from,next){
    // console.log('beforeRouteLeave函数执行了')
    next()
  }
}
</script>

<style scoped>
.topMenu{
  padding-bottom: 10px;
  list-style: none;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
}
.topMenu li a{
  color: #191a1b;
  text-decoration: none;
}

.topMenu li a.router-link-active{
  color: #ff5f16;
  border-bottom: 2px solid #ff5f16;
  padding-bottom: 10px;
}

</style>