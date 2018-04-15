export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      searchText: '',
      currentPage: 1,
      totalSize: 0,
      pageSize: 1,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false, // 控制编辑
      // 1.添加rules验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      // 让分页组件的页码回归到1
      this.currentPage = 1
      // console.log(`每页 ${pageSize} 条`)
    },
    handleCurrentChange (currentPage) {
      // this.currentPage = currentPage
      // 拿到当前的最新的每页多少条数据
      this.loadUsersByPage(currentPage, this.pageSize)
      // console.log(`当前页: ${currentPage}`)
    },
    handleSearch () {
      this.loadUsersByPage(1, this.pageSize)
    },
    // 根据页码加载用户列表数据
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: { // 请求参数， 对象会被转换成 k=v&k=v 的格式，然后拼接到请求路径?的后边
          pagenum: page,
          pagesize: pageSize,
          query: this.searchText // 根据文本框的内容搜索数据
        }
      })
      // console.log(res)
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async handleStateChange (val, user) {
      // console.log(val,user)
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${val}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态 ${val} === true ? '启用':'禁用' 成功`
        })
      }
    },
    // 处理添加用户
    async handleAddUser () {
      // console.log(this.userForm)
      // 1. 获取表单数据
      // 2. 表单验证
      // 3. 发起请求
      // 4. 根据响应做交互
      //   添加用户之后做出提示
      //   添加用户之后重新加载列表数据

      // Vue的$refs方法可以用来获取设置了ref属性的DOM
      // console.log(this.$refs['addUserForm'])

      this.$refs['addUserForm'].validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          return false
        }
        const res = await this.$http.post('/users', this.userForm)
        // console.log(res)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          // 关闭弹框
          this.dialogFormVisible = false
          // 重新加载当前页面
          this.loadUsersByPage(this.currentPage, this.pageSize)

          // 清空表单内容
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
    },
    // 处理删除用户
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 点击确认执行该方法
        // console.log(11)
        // 执行删除操作
        const res = await this.$http.delete(`/users/${user.id}`)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 删除成功后重新加载数据
          this.loadUsersByPage(this.currentPage, this.pageSize)
        }
      }).catch(() => { // 点击取消执行该方法
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 处理编辑用户
    async handleEditUser () {
      // console.log(this.editUserForm)
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
        this.dialogEditFormVisible = false // 关闭编辑用户表单对话框
        this.loadUsersByPage(this.currentPage, this.pageSize) // 重新加载当前页数据
      }
    },
    // 处理显示被编辑的用户表单信息
    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      // console.log(res)
      this.editUserForm = res.data.data
    }
  }
}