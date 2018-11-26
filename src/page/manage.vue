<template>

        <div class="manage_page fillcontain">
            <el-row style="height: 100%;" >
                <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                    <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>

                        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>

                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                            <el-menu-item index="doctorList">医生列表</el-menu-item>
                            <el-menu-item index="nurseList">护士列表</el-menu-item>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                            <el-menu-item index="addDoctor">添加医生</el-menu-item>
                            <el-menu-item index="addNurse">添加护士</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-col>
                <el-col :span="20" style="height: 100%;overflow: auto;">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-col>
            </el-row>
        </div>

</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {
    }

    .app-container {
        margin: 0 auto;
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
