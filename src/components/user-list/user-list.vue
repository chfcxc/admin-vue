<template>
  <div class="user-list-wrap">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="user-list-search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button plain type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <!--在这里可以拿到scope.row拿到当前遍历对象-->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,2,3,4,5]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
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
      pageSize: 1
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
      this.currentPage = currentPage
      // 拿到当前的最新的每页多少条数据
      this.loadUsersByPage(currentPage, this.pageSize)
      // console.log(`当前页: ${currentPage}`)
    },
    // 根据页码加载用户列表数据
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: { // 请求参数， 对象会被转换成 k=v&k=v 的格式，然后拼接到请求路径?的后边
          pagenum: page,
          pagesize: pageSize
        }
      })
      // console.log(res)
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}

.user-list-search {
  margin-bottom: 10px;
}
</style>
