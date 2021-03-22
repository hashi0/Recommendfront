<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入用户id查询" class="input-with-select" v-model="queryInfo.query" clearable
                    @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"/>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogHandler">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <!--                <el-table-column label="姓名" prop="name"></el-table-column>-->
        <!--                <el-table-column label="年龄" prop="age"></el-table-column>-->
        <!--                <el-table-column label="性别" prop="gender"></el-table-column>-->
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改(todo😅)" placement="top" :enterable="false" :hide-after="1500">
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除(todo😅)" placement="top" :enterable="false" :hide-after="1500">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background>
      </el-pagination>
    </el-card>
    <el-dialog
        title="添加用户"
        width="50%"
        :visible.sync="addDialogVisible" @close="addDialogClosed">
      <el-form
          :model="addUserForm"
          :rules="addUserFormRules"
          ref="addUserFormRef"
          label-width="70px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="addUserForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" type="password" show-password></el-input>
        </el-form-item>
        <!--                <el-form-item label="年龄">-->
        <!--                    <el-select v-model="addUserForm.age" placeholder="请选择">-->
        <!--                        <el-option v-for="count in 200" :key="count" :label="count" :value="count"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="性别">-->
        <!--                    <el-select v-model="addUserForm.gender" placeholder="请选择">-->
        <!--                        <el-option key="nan" label="男" value="nan"></el-option>-->
        <!--                        <el-option key="nv" label="女" value="nv"></el-option>-->
        <!--                    </el-select>-->
        <!--                </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserButtonHandler">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        page: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addUserForm: {
        userId: '',
        password: ''
      },
      addUserFormRules: {
        userId: [{
          required: true,
          message: '请输入用户ID',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码！',
          trigger: 'blur'
        }],
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList: async function () {
      const {data: res} = await this.$http.get('user/all', {params: this.queryInfo});
      if (res.error_code !== 200) return this.$message.error(res.error_msg);
      this.$message.success(res.error_msg);
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange: function (newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange: function (newPage) {
      this.queryInfo.page = newPage;
      this.getUserList();
    },
    addUserDialogHandler: function () {
      this.addDialogVisible = true;
    },
    addDialogClosed: function () {
      this.resetFormData();
      this.$refs.addUserFormRef.resetFields();
    },
    resetFormData: function () {
      this.addUserForm = {
        userId: '',
        password: ''
      };
    },
    addUserButtonHandler: function () {
      this.addDialogVisible = false;
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return;
        const {data: res} = await this.$http.post('user/add', this.addUserForm);
        if (res.error_code !== 200) this.$message.error(res.error_msg);
        this.$message.success(res.error_msg);
        await this.getUserList();
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
