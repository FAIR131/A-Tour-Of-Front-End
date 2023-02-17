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
      this.$router.replace({
        path: "/mine",
        query: { username: "zhangsan", age: 20 },
      });
    },
  },
  beforeRouteEnter: function (to, from, next) {
    // beforeRouteEnter路由守卫在页面创建之前调用,此时this没有值
    // 在next函数中可以传一个回调函数,回调函数的形参就是当前页面的实例
    next((instance) => {
      console.log(instance);
    });
  },
  beforeRouteUpdate: function (to, from, next) {
    // console.log("beforeRouteUpdate函数执行了");
    // beforeRouteUpdate在页面显示时不会触发,在路由改变时会触发
    next();
  },
  beforeRouteLeave: function (to, from, next) {
    console.log("beforeRouterLeave函数执行了");
    next();
  },
};
</script>

<style>
.top-menu {
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  padding-bottom: 10px;
}
.top-menu li a {
  color: #191a1b;
  text-decoration: none;
}
.top-menu li a.router-link-active {
  color: #ff5f16;
  border-bottom: 2px solid #ff5f16;
  padding-bottom: 10px;
}
</style>