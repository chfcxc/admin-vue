<template>
<div class="login-wrap">
  <p>登录组件</p>
  <el-form label-position="top" ref="form" label-width="80px" :model="userForm">
  <el-form-item label="用户名">
    <el-input v-model="userForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="userForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">立即创建</el-button>
    <el-button>取消</el-button>
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
      console.log(res)
      const data = res.data
      if (data.meta.status === 200) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
<style>
</style>
