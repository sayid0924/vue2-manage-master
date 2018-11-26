<template>

    <div class="header_container" >
        <el-button  type="success" style="margin-right: 100px" v-on:click="hidSide" round>{{side}}</el-button>

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start'>

            <h2 v-text="username" style="margin-right: 50px"></h2>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-button  type="success" style="margin-right: 100px" v-on:click="handleSwitchScreen" round>{{screen}}</el-button>

    </div>
</template>

<script>
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'
    import { requestFullScreen,exitFullscreen} from '@/utils';

    export default {
        data() {
            return {
                baseImgPath,
                username: '',
                isFullScreen: false,
                screen:'点击全屏',
                side:'隐藏侧边栏',
            }
        },
        created() {
            this.testFunc();
        },
        computed: {
            ...mapState(['userInfo']),
        },

        methods: {
            ...mapActions(['setUserInfo']),
            ...mapActions(['deteleUserInfo']),
            async handleCommand(command) {
                if (command === 'home') {
                    this.$router.push('/manage');
                } else if (command === 'singout') {
                    const res = await signout()
                    if (res.status === 1) {
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.deteleUserInfo();
                        this.$router.push('/');
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }
            },
            testFunc: (function () {
                // if (!isEmptyObject(this.userInfo)) {
                //    // this.$refs.myElement
                //     console.log("adminInfo >>>>    " + JSON.stringify(this.userInfo))
                //    this.username=  JSON.parse(this.userInfo).data.username;
                // } else {
                //     console.log("adminInfo >>>>   isEmptyObject  ")
                // }
            }),
            handleSwitchScreen () {
                if (this.isFullScreen) {
                    exitFullscreen()
                    this.screen="点击全屏"
                    this.isFullScreen = false
                } else {
                    requestFullScreen()
                    this.screen="退出全屏"
                    this.isFullScreen = true
                }
            },
            hidSide(){


            }
        }
    }

    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .header_container {
        background-color: #EFF2F7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }

    .avator {
        .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
