<template>
  <div class="login" @keypress.enter="onSubmit">
    <div class="content">
      <el-image src="https://cartest.zjcjj.net/logo.png"></el-image>
      <el-form :rules="rules" :model="form" ref="loginForm">
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.account"
            placeholder="请输入账户"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="text" style="color: white">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data: function () {
    return {
      form: {},
      rules: {
        account: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["init_current_user"]),
    onSubmit: function () {
      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          // 提交数据到后台
          this.$http.post("/sysUser/login",this.form).then(res=>{
            if(res.data.code){
              this.init_current_user(res.data.object);
              sessionStorage.setItem("currentUser",JSON.stringify(res.data.object))
              // 登录成功,跳转到首页
              this.$router.push("/home")
            }else{
              // 登录不成功,提示用户
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
  },
};
</script>
<style lang="scss">
.login {
  height: 100%;
  background: url("https://zjcjj.net/carcheck/static/img/bannerBg.45f34d5.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 270px;
    height: 285px;
    padding: 15px 15px 0;
    background: rgba(255, 255, 255, 0.075);
    border-radius: 8px;
    .el-image {
      width: 130px;
    }
    .el-form {
      margin-top: 15px;
    }
  }
}
</style>