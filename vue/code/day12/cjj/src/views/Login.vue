<template>
  <div class="login" @keypress.enter="submit">
    <div class="container">
      <!--  图-->
      <el-image
          style="width: 100px; height: 100px"
          src="https://cartest.zjcjj.net/logo.png"></el-image>
      <!-- 表单-->
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="account">
          <el-input placeholder="请输入账户" prefix-icon="el-icon-user"
                    v-model="loginForm.account"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock"
                    v-model="loginForm.password" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button type="text">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      loginForm: {},
      rules: {
        account: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    ...mapMutations(["init_current_users"]),
    submit() {
      // console.log( this.$refs.loginForm)
      //element-ui上摘下来
      this.$refs.loginForm.validate((valid) => {
        //如果符合规范就返回true ,反之false
        // console.log(valid)
        if (valid) {
          // 提交数据到后台
          this.$http.post("/sysUser/login", this.loginForm).then(res => {
            console.log(res)
            if (res.data.code) {
              //验证成功的话要把用户数据保存初始化
              this.init_current_users(res.data.object);
              sessionStorage.setItem("currentUser", JSON.stringify(res.data.object))
              //  跳转到home页面
              this.$router.push("/home")
            } else {
              //  报错
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  background: url("@/assets/bannerBg.jpg");
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 270px;
    height: 285px;
    background: rgba(255, 255, 255, 0.075);
    border-radius: 10px;
    padding: 15px;

    .el-image {
      width: 130px !important;
      padding-bottom: 15px;

    }

    .el-button {
      color: #fff;
    }
  }
}
</style>