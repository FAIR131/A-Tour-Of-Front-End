<template>
  <div>
    <p>
      <input type="text" placeholder="请输入账户" v-model="account">
    </p>
    <p>
      <input type="password" placeholder="请输入密码" v-model="password">
    </p>
    <p>
      <button @click="login">登录</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      // axios.post("",{account:this.account,password:this.password})
      // 假设这里调用后端接口,验证用户名密码已通过
      sessionStorage.setItem('currentUser', `{username:${this.account},password:${this.password}}`)
      this.$router.push('/mine')
    }
  }

}
</script>

<style scoped>

</style>