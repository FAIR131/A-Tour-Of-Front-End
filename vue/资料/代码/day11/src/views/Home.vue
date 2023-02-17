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
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  name: "HomeView",
  components: {},
  computed: {
    ...mapState(["currentUser"]),
  },
  methods:{
    ...mapMutations(["clear_current_user"]),
    logOut:function(){
      this.clear_current_user();
      this.$router.push("/login")
    }
  }
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
  }
}
</style>
