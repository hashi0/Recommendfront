<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table :data="orderList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="订单ID" prop="orderId" min-width="30%"></el-table-column>
                <el-table-column label="用户ID" prop="userId" min-width="30%"></el-table-column>
                <el-table-column label="商品ID" prop="productId" min-width="35%"></el-table-column>
                <el-table-column label="商品名称" prop="productName" min-width="100%"></el-table-column>
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
                query:'',
                page:1,
                pageSize:10
            },
            total:0,
            orderList:[],
        };
    },
    created(){
        this.getOrderList();
    },
    methods:{
        getOrderList:async function(){
            this.$message.info("查询中……请稍等");
            const {data:res}=await this.$http.get('order/all',{params:this.queryInfo});
            if(res.error_code!==200) return this.$message.error(res.error_msg);
            this.$message.success(res.error_msg);
            this.orderList=res.data.orders;
            this.total=res.data.total;
        },
        handleSizeChange:function(newSize){
            this.queryInfo.pageSize=newSize;
            this.getOrderList();
        },
        handleCurrentChange:function(newPage){
            this.queryInfo.page=newPage;
            this.getOrderList();
        },
    }
};
</script>
<style scoped>
</style>
