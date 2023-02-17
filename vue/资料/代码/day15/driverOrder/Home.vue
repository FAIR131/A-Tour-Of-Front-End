<template>
  <el-container>
    <el-aside width="200px">
      <h1>浙江车检检汽车服务有限公司</h1>
      <el-avatar
        src="https://cartest.zjcjj.net/logo.png"
        :size="80"
      ></el-avatar>
      <p>
        欢迎您,{{ currentUser.username }}
        <el-tooltip
          class="item"
          effect="dark"
          content="点击退出"
          placement="top"
        >
          <i class="el-icon-switch-button" @click="logOut"></i>
        </el-tooltip>
      </p>

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-submenu :index="item.path" v-for="item in menus" :key="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>

          <el-menu-item :index="'/home'+subitem.path" v-for="subitem in item.children" :key="subitem.path"> <i :class="subitem.icon"></i> {{subitem.name}}</el-menu-item>

        </el-submenu>
        
      </el-menu>
    </el-aside>
    <el-main>      
      <router-view  v-if="isShow" ></router-view>
      <el-backtop target=".el-main"></el-backtop>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HomeView",
  components: {},
  provide: function () {
    return {
      reload: this.updatePage,
    };
  },
  data:function(){
    return {
      menus:[],
      isShow: true,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  mounted:function(){
    this.$http.post("/sysUser/getUserMenus",this.currentUser).then(res=>{
      this.menus=res.data.object;
    })
  },
  methods: {
    updatePage: function () {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    ...mapMutations(["clear_current_user"]),
    logOut: function () {
      this.clear_current_user();
      sessionStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss">
.el-container {
  background: #f6fafd;
  height: 100%;
  .el-aside {
    box-shadow: 0px 0px 40px 0px rgba(2, 25, 35, 0.1);
    padding: 0 12px;
    h1 {
      margin-top: 30px;
      text-align: center;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 500;
      color: #333;
    }
    .el-avatar {
      margin: 32px 0 20px;
    }
    .el-menu {
      border: none;
      margin-top: 20px;
    }
  }
}
</style>
