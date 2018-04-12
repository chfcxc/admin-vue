<template>
<div class="login-wrap">
  <el-form class="login-form" label-position="top" ref="form" label-width="80px" :model="userForm">
  <h2>用户登陆</h2>
  <el-form-item label="用户名">
    <el-input v-model="userForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="userForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
  </el-form-item>
  </el-form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:8888/api/private/v1/login', this.userForm)
      // console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        // 登录成功 将服务器签发给用户的Token身份令牌记录到localStorage
        window.localStorage.setItem('admin-token', JSON.stringify(data.data))
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
