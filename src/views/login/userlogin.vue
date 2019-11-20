<template>
    <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
        <el-form-item prop="username">
            <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
                      placeholder="请输入用户名">
                <i slot="prefix" class="el-icon-s-custom"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                      auto-complete="off" placeholder="请输入密码">
                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
                <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'userlogin',
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456',
                    code: '',
                    grant_type: 'password',
                    scope: 'all',
                    randomStr: ''
                },
                loginRules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 2, message: '密码长度最少为2位', trigger: 'blur'}
                    ]
                },
                passwordType: 'password'
            }
        },
        mounted() {
        },
        computed: {
            ...mapGetters(['tagWel'])
        },
        props: [],
        methods: {
            showPassword() {
                this.passwordType === ''
                    ? (this.passwordType = 'password')
                    : (this.passwordType = '')
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.$api.login(this.loginForm)
                    }
                })
            }
        }
    }
</script>

<style>

</style>
