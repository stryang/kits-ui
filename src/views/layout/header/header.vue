<template>
    <div>
        <el-header id="header">
      <span class="hideAside" @click="collapse">
        <svg t="1492500959545" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
            p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
            p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
            p-id="1694"></path>
    </svg>
          <!--        <i class="fa fa-bars" :class="{'is-active':isActive}"></i>-->
      </span>
            <ul class="personal">
                <li class="fullScreen" @click="fullScreen">
                    <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"><i
                            class="fa fa-arrows-alt fa-lg"></i></el-tooltip>
                </li>
                <!--        <li>{{ this.$store.getters.info.role }}</li>-->
                <li>
                    <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                      <i class="el-icon-s-custom"></i>
                    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">个人信息</el-dropdown-item>
                            <el-dropdown-item command="b">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <!--        <li class="icon"><img :src="avatar"/></li>-->
            </ul>
        </el-header>
        <tabNav></tabNav>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import tabNav from './tabNav'

    export default {
        name: 'Header',
        components: {tabNav},
        data() {
            return {
                isfullScreen: true,
                avatar: './static/images/icon.jpg',
                isActive: true,
                userName: JSON.parse(Cookies.get('userInfo')).userName
            }
        },
        methods: {
            collapse() {
                this.$store.dispatch('collapse')
                this.isActive = !this.isActive
            },
            fullScreen() {
                if (this.isfullScreen) {
                    var docElm = document.documentElement
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen()
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen()
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen()
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen()
                    }
                    this.isfullScreen = false
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen()
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen()
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    }
                    this.isfullScreen = true
                }
            },
            handleCommand(command) {
                if (command === 'logout') {
                    this.$confirm("是否退出系统?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        this.$api.logout().then(res => {
                            Cookies.remove('token')
                            this.$store.dispatch('setToken', '').then(() => {

                            }).catch(res => {
                                that.$message({
                                    showClose: true,
                                    message: res,
                                    type: 'error'
                                })
                            })
                            this.$router.push({path: '/'})
                        }).catch(res => {

                        })
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    $top: top;
    $bottom: bottom;
    $left: left;
    $right: right;
    $leftright: ($left, $right);
    %w100 {
        width: 100%;
    }

    %h100 {
        height: 100%;
    }

    %cursor {
        cursor: pointer;
    }

    html, body, #app, .el-container, #asideNav, ul.el-menu {
        @extend %h100;
    }

    @mixin set-value($side, $value) {
        @each $prop in $leftright {
            #{$side}-#{$prop}: $value;
        }
    }

    #header {
        max-height: 50px;
        line-height: 50px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        display: flex;
        justify-content: space-between;

        .hideAside {
            @extend %cursor;
        }

        .personal {
            display: flex;
            flex-direction: row;

            li {
                @include set-value(margin, 13px);
                font-size: 12px;
            }

            .fullScreen {
                @extend %cursor;
            }

            .el-dropdown-link {
                @extend %cursor;
            }

            .icon img {
                margin-#{$top}: 7px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                width: 40px;
                height: 40px;
            }
        }
    }

    .hamburger {
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
        transition: .38s;
        transform-origin: 50% 50%;
    }

    .hamburger.is-active {
        transform: rotate(0deg);
    }

    .item {
        color: #606266;
    }
</style>
