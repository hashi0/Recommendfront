<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>推荐管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的推荐列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table :data="resultList" border stripe>
              <el-table-column type="index" min-width="20%"></el-table-column>
<!--              <el-table-column label="推荐结果ID" prop="resultId" min-width="20%"></el-table-column>-->
              <el-table-column label="用户ID" prop="userId" min-width="20%"></el-table-column>
              <el-table-column label="商品ID" prop="productId" min-width="20%"></el-table-column>
              <el-table-column label="商品名称" prop="productName" min-width="80%"></el-table-column>
              <el-table-column label="商品部门" prop="department" min-width="30%"></el-table-column>
              <el-table-column label="商品货架" prop="aisle" min-width="35%"></el-table-column>
              <el-table-column label="指数" prop="exp" min-width="20%"></el-table-column>
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
            this.$message.info("查询中……请稍等");
            const {data:res}=await this.$http.get('result/my',{params:this.queryInfo});
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
