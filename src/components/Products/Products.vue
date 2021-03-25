<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入商品名称查询" class="input-with-select" v-model="queryInfo.query" clearable @clear="getGoodList" @keyup.enter.native="getGoodList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodList"/>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addGoodDialogHandler">添加商品</el-button>
                </el-col>
            </el-row>
            <el-table :data="goodList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品ID" prop="productId" min-width="25%"></el-table-column>
                <el-table-column label="商品名称" prop="productName" min-width="100%"></el-table-column>
                <el-table-column label="部门" prop="department" min-width="35%"></el-table-column>
                <el-table-column label="货架" prop="aisle" min-width="60%"></el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="购买" placement="top" :enterable="false" :hide-after="1500">
                            <el-button type="warning" icon="el-icon-shopping-cart-full" size="mini" @click="buyGoodHandler(scope.row)"></el-button>
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
            title="添加商品"
            width="45%"
            :visible.sync="addDialogVisible" @close="addDialogClosed">
            <el-form
                :model="addGoodForm"
                :rules="addGoodFormRules"
                ref="addGoodFormRef"
                label-width="150px">
              <el-form-item label="商品ID" prop="productId">
                <el-input v-model="addGoodForm.productId"></el-input>
              </el-form-item>
                <el-form-item label="商品名称" prop="productName">
                    <el-input v-model="addGoodForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="商品所属部门" prop="department">
                    <el-input v-model="addGoodForm.department"></el-input>
                </el-form-item>
                <el-form-item label="商品所属货架" prop="aisle">
                    <el-input v-model="addGoodForm.aisle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGoodButtonHandler">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return {
            queryInfo:{
                query:'',
                page:1,
                pageSize:10
            },
            goodList:[],
            total:0,
            addDialogVisible:false,
            addGoodForm:{
                productId:'',
                productName:'',
                department:'',
                aisle:'',
                departmentId:0,
                aisleId:0
            },
            addGoodFormRules:{
                productId:[{
                  required:true,
                  message:'请输入商品ID',
                  trigger:'blur'
                }],
                productName:[{
                    required:true,
                    message:'请输入商品名称',
                    trigger:'blur'
                }],
                department:[{
                    required:true,
                    message:'请输入商品所属部门',
                    trigger:'blur'
                }],
                aisle:[{
                    required:true,
                    message:'请输入商品所属货架',
                    trigger:'blur'
                }],
            }
        };
    },
    created(){
        this.getGoodList();
    },
    methods:{
        getGoodList:async function(){
            this.$message.info("查询中……请稍等");
            const {data:res}=await this.$http.get('good/all',{params:this.queryInfo});
            if(res.error_code!==200) return this.$message.error(res.error_msg);
            this.$message.success(res.error_msg);
            this.goodList=res.data.goods;
            this.total=res.data.total;
        },
        handleSizeChange:function(newSize){
            this.queryInfo.pageSize=newSize;
            this.getGoodList();
        },
        handleCurrentChange:function(newPage){
            this.queryInfo.page=newPage;
            this.getGoodList();
        },
        addGoodDialogHandler:function(){
            this.addDialogVisible=true;
        },
        addDialogClosed:function(){
            this.resetFormData();
            this.$refs.addGoodFormRef.resetFields();
        },
        resetFormData:function(){
            this.addGoodForm={
              productId:'',
              productName:'',
              department:'',
              aisle:'',
              departmentId:0,
              aisleId:0
            };
        },
        addGoodButtonHandler:function(){
            this.addDialogVisible=false;
            this.$refs.addGoodFormRef.validate(async valid=>{
                if(!valid) return;
                const {data:res}=await this.$http.post('good/add',this.addGoodForm);
                if(res.error_code!==200) this.$message.error(res.error_msg);
                this.$message.success(res.error_msg);
                await this.getGoodList();
            });
        },
        buyGoodHandler:async function(row){
            const {data:res}=await this.$http.post('good/buy?',{
              productId:row.productId,
              productName:row.productName,
              department:row.department,
              aisle:row.aisle,
              departmentId:0,
              aisleId:0
            });
            console.log(res);
            if(res.error_code!==200) this.$message.error(res.error_msg);
            this.$message.success(res.error_msg);
        }
    }
};
</script>
<style scoped>
</style>
