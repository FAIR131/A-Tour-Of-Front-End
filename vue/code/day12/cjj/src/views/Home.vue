<template>
  <div class="home">
    <el-container>

      <el-aside width="200px">

        <h1>浙江车检检汽车服务有限公司</h1>
        <el-avatar :size="80" src="https://cartest.zjcjj.net/logo.png"></el-avatar>
        <p>欢迎您，{{ currentUser.username }}
          <el-tooltip class="item" effect="dark" content="点击退出" placement="top">
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
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/home'+subItem.path" v-for="subItem in item.children" :key="subItem.path">
                <i :class="subItem.icon"></i>
                {{ subItem.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>


      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapMutations, mapState} from "vuex"

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      menus: [],
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },

  methods: {
    ...mapMutations(["clear_current_users"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    logOut() {
      this.clear_current_users();
      sessionStorage.removeItem("currentUser");
      this.$router.push("/login")
    }
  },
  mounted() {
    this.$http.post("/sysUser/getUserMenus", this.currentUser).then(res => {
      // console.log(res.data.object)
      this.menus = res.data.object
    })
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;

  .el-container {
    background: #f6fafd;
    height: 100%;

    .el-aside {
      width: 214px !important;
      box-shadow: 0 0 40px 0 rgb(2 25 35 / 10%);
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
        margin: 30px 45px 20px;
      }
    }

    .el-menu {
      margin-top: 20px;
    }
  }
}


</style>