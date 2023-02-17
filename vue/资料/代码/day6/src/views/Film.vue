<template>
  <div>
    <!-- <button @click="watchScore">查看积分</button> -->
    <ul class="top-menu">
      <li>
        <router-link to="/film/hotfilm">正在热映</router-link>
      </li>
      <li>
        <router-link to="/film/newfilm">即将上映</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: { 
    watchScore: function () {
      // 编程式导航(通过路由对象进行跳转)
      // replace是将目标页面的路由在栈中替换当前页的记录
      // this.$router.replace("/mine?username=zhangsan&age=20")
      this.$router.replace({path:"/mine",query:{username:'zhangsan',age:20}})
    } 
  },
};
</script>

<style>
.top-menu{
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  margin-top:20px;
  padding-bottom: 10px;
}
.top-menu li a{
  color:#191a1b;
  text-decoration: none;
}
.top-menu li a.router-link-active{
  color:#ff5f16;
  border-bottom:2px solid #ff5f16;
  padding-bottom: 10px;
}
</style>