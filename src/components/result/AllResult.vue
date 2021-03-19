<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
            <el-breadcrumb-item>所有推荐列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入用户ID" class="input-with-select" v-model="queryInfo.uid" clearable @clear="getResultList">
                        <el-button slot="append" icon="el-icon-search" @click="getResultList"/>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :data="resultList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="用户ID" prop="uid"></el-table-column>
                <el-table-column label="商品ID" prop="gid"></el-table-column>
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
    </div>
</template>
<script>
export default {
    data(){
        return {
            queryInfo:{
                uid:null,
                page:1,
                pageSize:10
            },
            total:0,
            resultList:[],
        };
    },
    created(){
        this.getResultList();
    },
    methods:{
        getResultList:async function(){
            const {data:res}=await this.$http.get('result/all',{params:this.queryInfo});
            if(res.error_code!==200) return this.$message.error(res.error_msg);
            this.$message.success(res.error_msg);
            this.resultList=res.data.results;
            this.total=res.data.total;
        },
        handleSizeChange:function(newSize){
            this.queryInfo.pageSize=newSize;
            this.getResultList();
        },
        handleCurrentChange:function(newPage){
            this.queryInfo.page=newPage;
            this.getResultList();
        },
    }
};
</script>
<style scoped>
</style>
