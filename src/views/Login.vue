<template>
    <!-- 根div -->
    <div class="login_container">
        <!-- 登录表单 -->
        <div class="login_form">
            <h3 class="title">登录页面</h3>
            <el-form ref="formRef" :model="loginForm" label-width="auto" style="width:50%"> 
                <!-- 用户名 -->
                <el-form-item >
                    <el-input v-model="loginForm.account" placeholder="请输入账号" >
                        <template #prefix>
                            <el-icon>
                                <el-icon-User/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item >
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password >
                        <template #prefix>
                            <el-icon>
                                <el-icon-lock/>
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 记住我与忘记密码 -->
                <div class="rememberMe">
                    <!-- 记住我 -->
                    <el-checkbox v-model="loginForm.rememberme" label="记住我"/>
                    <!-- 忘记密码 -->
                    <el-text class="mx-1 forgetPass" type="primary">忘记密码？</el-text>
                </div>
                <!-- 分隔符 -->
                <el-divider>其它登录方式</el-divider>
                <div class="otherLogin">
                    <el-icon class="otherLoginItem"><el-icon-User/></el-icon>
                    <el-icon class="otherLoginItem"><el-icon-User/></el-icon>
                    <el-icon class="otherLoginItem"><el-icon-User/></el-icon>
                </div>
            <!-- 登录按钮 -->
            <el-form-item >
                <el-button style="width:100%" type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>

<script setup>
    // 导入ref
    import { login } from '@/api/auth';
import { setToken } from '@/utils/token';
    import {ref} from 'vue'
    // 申明表单变量
    const loginForm = ref({
        account:undefined,
        password:undefined,
        rememberme:undefined
    })
    // 申明方法
    function handleLogin(){
        // 调用login方法
        login(loginForm.value).then((res)=>{
            console.log("登录====>",res)
            // 判断是否成功
            if(res.data.code == 200) {
                // 将token存入sessionStroge中
                setToken("daoCaoToken",res.data.token);
                //TODO 查询用户的权限和菜单，设置页面路由实现动态路由
            }
        })
    };
</script>

<style lang="scss" scoped>
.login_container {
    background-image: url('/src/assets/image/loginImage.jpg');
    background-size: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    .login_form {
        display: flex;
        justify-content: center;
        align-items: center;
        // 设置换行
        flex-direction: column;
        width: 50%;
        background-color: #fff;
        .title {
            margin-bottom: 20px;
        }
        .rememberMe{
            display: flex;
            justify-content: space-between;
            .forgetPass{
                cursor: pointer;
            }
        }
        .otherLogin{
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            .otherLoginItem{
                margin: auto 10px;
                cursor: pointer;
            }
        }
    }
}
</style>