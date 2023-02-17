<template>
    <div id="login">
        <div class="content">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size='large' status-icon class="login_form"> 
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item  class="btns" >
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import http from "../axios/index"
const store = useCounterStore()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: '',
    password: ''
})
const rules = reactive({
    //验证账号是否合法
    username: [
        { required: true, message: '请输入登录名称', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    // 验证密码是否合法
    password: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
    ]
})
let Router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            http.post('login', ruleForm).then(res => {
                console.log(res.data.meta.status);
                
                if (res.data.meta.status) {
                    ElMessage.success("登录成功!")
                    store.login = res.data.data
                    sessionStorage.setItem("user", JSON.stringify(res.data.data))
                    Router.push("/home")
                } else {
                    ElMessage.error("账号或密码不正确")
                }
            })
        } else {
            ElMessage.error("请输入账号密码")
        }
    })
}

</script>

<style scoped>
#login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* background-color: rgb(238, 237, 241); */
    /* width: 100%; */
    background: url("../assets/bk.jpg") no-repeat;
    background-size: 100% 100%;
}

#login .content .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
}

#login .content .avatar_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
}

#login .content {
    position: relative;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
}
.login_form{
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
}
.btns{
    margin-left: 53%;
    transform: translateX(-50%);
}
</style>