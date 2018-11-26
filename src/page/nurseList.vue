<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">

            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="出生日期">
                                <span>{{ props.row.birthday }}</span>
                            </el-form-item>
                            <el-form-item label="学历">
                                <span>{{ props.row.education }}</span>
                            </el-form-item>
                            <el-form-item label="身高">
                                <span>{{ props.row.height }}</span>
                            </el-form-item>
                            <el-form-item label="体重">
                                <span>{{ props.row.weight }}</span>
                            </el-form-item>
                            <el-form-item label="证件号码">
                                <span>{{ props.row.idNumber }}</span>
                            </el-form-item>
                            <el-form-item label="挂号金额">
                                <span>{{ props.row.guoHaoMoney }}</span>
                            </el-form-item>
                            <el-form-item label="特长">
                                <span>{{ props.row.specialty }}</span>
                            </el-form-item>
                            <el-form-item label="简介">
                                <span>{{ props.row.intro }}</span>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column
                    label="医生姓名"
                    prop="doctorName">
                </el-table-column>

                <el-table-column
                    label="性别"
                    prop="sex">
                </el-table-column>

                <el-table-column
                    label="职称"
                    prop="title">
                </el-table-column>

                <el-table-column
                    label="手机号码"
                    prop="mobile">
                </el-table-column>

                <el-table-column
                    label="地址"
                    prop="address">
                </el-table-column>

                <el-table-column
                    label="婚姻情况"
                    prop="marriage">
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getFindDoctorByCondition,fetchDeleteDoctor} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                pageNum: 1,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const doctorData = await getFindDoctorByCondition({
                        hospitalDeptId: 1,
                        pageNum: this.pageNum,
                        pageSize: 10
                    });
                    if (doctorData.code === 0) {
                        this.count = doctorData.data.total;
                        this.tableData = [];
                        doctorData.data.list.forEach(item => {
                            const tableData = {};
                            tableData.id = item.id;
                            tableData.doctorName = item.doctorName;
                            tableData.birthday = item.birthday;
                            tableData.title = item.title;
                            if (item.sex === 1) {  //0-男、1-女、2-未知
                                tableData.sex = "女";
                            } else {
                                tableData.sex = "男";
                            }
                            if (item.marriage === 1) {   //婚姻情况(0-未婚、1-已婚、2-未知)
                                tableData.marriage = "已婚";
                            } else {
                                tableData.marriage = "未婚";
                            }
                            tableData.mobile = item.mobile;
                            tableData.height = item.height;
                            tableData.weight = item.weight;
                            tableData.address = item.address;
                            tableData.education = item.education;
                            tableData.guoHaoMoney = item.guoHaoMoney;
                            tableData.idNumber = item.idNumber;
                            tableData.intro = item.intro;
                            tableData.specialty =item.specialty;
                            this.tableData.push(tableData);
                        })
                    } else {
                        throw new Error('获取数据失败');
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(val)
                this.pageNum = val;
                this.getDoctorList()
            },
            async handleDelete(index, row) {
                try{
                    const res = await fetchDeleteDoctor({doctorId:row.id});
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除医生成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除医生失败')
                }
            },
            async getDoctorList() {
                const doctorData = await getFindDoctorByCondition({
                    hospitalDeptId: 1,
                    pageNum: this.pageNum,
                    pageSize: 10
                });
                if (doctorData.code === 0) {
                    this.tableData = [];
                    doctorData.data.list.forEach(item => {
                        const tableData = {};
                        tableData.doctorName = item.doctorName;
                        tableData.birthday = item.birthday;
                        tableData.title = item.title;
                        this.tableData.push(tableData);
                    })
                } else {
                    throw new Error('获取数据失败');
                }
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
