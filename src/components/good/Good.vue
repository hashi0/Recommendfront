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
                    <el-input placeholder="请输入商品名" class="input-with-select" v-model="queryInfo.query" clearable @clear="getGoodList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodList"/>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addGoodDialogHandler">添加商品</el-button>
                </el-col>
            </el-row>
            <el-table :data="goodList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="商品名称" prop="name"></el-table-column>
                <el-table-column label="商品价格" prop="price"></el-table-column>
                <el-table-column label="商品描述" prop="description"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="购买" placement="top" :enterable="false" :hide-after="500">
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
            width="50%"
            :visible.sync="addDialogVisible" @close="addDialogClosed">
            <el-form
                :model="addGoodForm"
                :rules="addGoodFormRules"
                ref="addGoodFormRef"
                label-width="100px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="addGoodForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                    <el-input v-model="addGoodForm.price"></el-input>
                </el-form-item>
                <el-form-item label="商品描述" prop="description">
                    <el-input v-model="addGoodForm.description"></el-input>
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
                name:'',
                price:0.0,
                description:''
            },
            addGoodFormRules:{
                name:[{
                    required:true,
                    message:'请输入商品名称',
                    trigger:'blur'
                }],
                price:[{
                    required:true,
                    message:'请输入商品价格',
                    trigger:'blur'
                }],
                description:[{
                    required:true,
                    message:'请输入商品描述',
                    trigger:'blur'
                }],
            },
        };
    },
    created(){
        this.getGoodList();
    },
    methods:{
        getGoodList:async function(){
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
                name:'',
                price:0.0,
                description:''
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
                id:row.id
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
