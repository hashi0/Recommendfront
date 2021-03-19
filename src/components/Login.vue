<template>
    <div class="login-container">
        <div class="login-box">
            <!-- 头像区域 -->
            <div class="avator-box">
                <img src="../assets/logo.png" alt="logo">
            </div>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="login-buttons">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                username:[{
                    required:true,
                    message:'请输入用户名',
                    trigger:'blur'
                },{
                    min:5,
                    max:10,
                    message:'长度在 5 到 10 个字符',
                    trigger:'blur'
                }],
                password:[{
                    required:true,
                    message:'请输入密码',
                    trigger:'blur'
                },{
                    min:6,
                    max:16,
                    message:'长度在 6 到 16 个字符',
                    trigger:'blur'
                }]
            }
        };
    },
    methods:{
        resetLoginForm:function(){
            this.$refs.loginFormRef.resetFields();
        },
        login:function(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return;
                const {data:result}=await this.$http.post('user/login',this.loginForm);
                if(result.error_code!==200) return this.$message.error(result.error_msg);
                this.$message.success(result.error_msg);
                window.sessionStorage.setItem('token',result.data.token);
                await this.$router.push('/home');
            });
        }
    }
};
</script>
<style lang="less" scoped>
.login-container{
    background-color: #6495ED;
    height: 100%;
}

.login-box{
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2%;
    box-shadow: 0 0 20px #000000;

    .avator-box{
        height: 130px;
        width: 130px;
        border: 1px solid #EEEEEE;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #000000;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #EEEEEE;

        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #EEEEEE;
        }
    }

    .login-buttons{
        display: flex;
        justify-content: flex-end;
    }

    .login-form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
    }
}
</style>
