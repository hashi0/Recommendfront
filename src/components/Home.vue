<template>
    <el-container class="home-container">
        <el-header>
            <div class="logo-box">
                <span>推荐引擎管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出登录</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    background-color="#333744"
                    text-color="#FFFFFF"
                    active-text-color="#6495ED"
                    :unique-opened="true"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true"
                    :default-active="activePath">
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconList[item.id]"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item
                            v-for="subItem in item.children"
                            :index="'/'+subItem.path"
                            :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name:"Home",
    data(){
        return {
            menuList:[{
                id:1,
                name:'用户管理',
                children:[{
                    id:11,
                    name:'用户列表',
                    order:1,
                    path:'user/all'
                },{
                    id:12,
                    name:'添加用户',
                    order:2,
                    path:'user/add'
                },{
                    id:13,
                    name:'删除用户',
                    order:3,
                    path:'user/delete'
                }],
                order:1,
                path:''
            },{
                id:2,
                name:'商品管理',
                children:[{
                    id:21,
                    name:'商品列表',
                    order:1,
                    path:'good/all'
                },{
                    id:22,
                    name:'添加商品',
                    order:2,
                    path:'good/add'
                },{
                    id:23,
                    name:'删除商品',
                    order:3,
                    path:'good/delete'
                }],
                order:2,
                path:''
            },{
                id:3,
                name:'订单管理',
                children:[{
                    id:31,
                    name:'订单列表',
                    order:1,
                    path:'order/all'
                }],
                order:3,
                path:''
            },{
                id:4,
                name:'推荐管理',
                children:[{
                    id:41,
                    name:'我的推荐',
                    order:1,
                    path:'result/my'
                },{
                    id:42,
                    name:'全部推荐',
                    order:2,
                    path:'result/all'
                },],
                order:4,
                path:''
            },],
            iconList:{
                '1':'el-icon-user',
                '2':'el-icon-goods',
                '3':'el-icon-shopping-cart-full',
                '4':'el-icon-present',
            },
            isCollapse:false,
            activePath:''
        };
    },
    created(){
        this.activePath=window.sessionStorage.getItem('activePath');
    },
    methods:{
        logout:function(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        toggleCollapse:function(){
            this.isCollapse=!this.isCollapse;
        },
        saveNavState:function(activePath){
            this.activePath=activePath;
            window.sessionStorage.setItem('activePath',activePath);
        }
    },
};
</script>
<style lang="less" scoped>
.el-header{
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #FFFFFF;
    font-size: 30px;

    > div{
        display: flex;
        align-items: center;

        span{
            margin-left: 20px;
        }
    }

    .logo-box{
        width: 100%;
        height: 60px;
    }
}

.el-aside{
    background-color: #333744;

    .el-menu{
        border-right: 0;
    }

    .toggle-button{
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #FFFFFF;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
}

.el-main{
    background-color: #FFFFFF;
}

.home-container{
    height: 100%;
}
</style>
