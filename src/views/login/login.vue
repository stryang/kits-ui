<template>
    <div id="login">
        <div class="loginConbox">
            <div class="login-title">kits管理平台</div>
            <div class="loginBox login-form-layout">
                <div class="loginCon">
                    <h2 class="title">用户登录</h2>
                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon label-width="100px">
                        <el-form-item prop="username">
                            <el-input
                                    type="text"
                                    v-model="loginForm.username"
                                    auto-complete="off"
                                    placeholder="请输入登录账号"
                                    @keyup.enter.native="submitForm('loginForm')">
                                <i slot="prefix" class="fa fa-user color-main"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    :type="pwdType"
                                    v-model="loginForm.password"
                                    auto-complete="off"
                                    placeholder="请输入登录密码"
                                    @keyup.enter.native="submitForm('loginForm')">
                                <i slot="prefix" class="fa fa-lock color-main"></i>
                                <i slot="suffix" class="fa fa-eye color-main" @click="showPwd"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="subBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
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
                code: {
                    src: '',
                    baseSrc: '/code',
                    value: '',
                    len: 4,
                    type: 'image'
                },
                codeError: '',
                loginRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 2, message: '密码长度最少为2位', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'}
                    ]
                },
                pwdType: 'password'
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            submitForm(loginForm) {
                // 第二次验证码错误时需要重新赋值
                this.codeError = ''
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.$api.login(this.loginForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    #login {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
    }

    .login-title {
        font-size: 35px;
        color: rgba(62, 225, 255, 1);
        padding-top: 30px;
        text-align: center;
    }

    .loginConbox {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../assets/login_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .login-form-layout {
        position: absolute;
        top: 30%;
        left: 65%;
        width: 300px;
        background: url("../../assets/login_border.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /*border: 1px solid #0e4182;*/
        -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .color-main {
        color: #409EFF;
    }

    .fa-eye {
        cursor: pointer;
    }

    #login {
        width: 100%;
        height: 100%;
    }

    .loginBox {
        padding: 50px;

        .loginCon {
            margin: auto;
            position: relative;

            .title {
                font-size: 36px;
                font-weight: 600;
                color: #409EFF;
                text-align: center;

                &:first-child {
                    font-size: 20px;
                }
            }

            .el-form-item__content {
                margin-left: 0px !important;

                .subBtn {
                    width: 100%;
                    color: #ffff;
                }
            }
        }

        .el-input__inner, .el-button, .el-card, .el-message {
            border-radius: 0px !important;
        }

        .el-input__inner {
            background: rgba(10, 27, 83, 1);
            border: 1px solid #409eff;
            color: #409eff;
        }

        .el-input__inner:hover {
            border: 1px solid #428cff;
        }
    }

    .login-code {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0 0 0 10px;
    }

    .login-code-img {
        cursor: pointer;
        width: 89px;
        height: 38px;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 5px;
        line-height: 32px;
        text-indent: 5px;
        text-align: center;
    }
</style>
