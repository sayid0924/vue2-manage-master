<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="birthday"
                  label="注册日期"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="doctorName"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="title"
                  label="注册地址">
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
    import {getFindDoctorByCondition, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                pageNum:1,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const doctorData = await getFindDoctorByCondition({hospitalDeptId: 1,pageNum: this.pageNum,pageSize:10});
                    if (doctorData.code === 0) {
                        this.count = doctorData.data.total;
                        this.tableData = [];
                        doctorData.data.list.forEach(item => {
                            const tableData = {};
                            tableData.doctorName = item.doctorName;
                            tableData.birthday = item.birthday;
                            tableData.title = item.title;
                            this.tableData.push(tableData);
                        })
                    }else{
                        throw new Error('获取数据失败');
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(val)
                // this.currentPage = val;
                // this.offset = (val - 1)*this.limit;
                // this.getDoctorList()
            },
            async getDoctorList(){
                const doctorData = await getFindDoctorByCondition({hospitalDeptId: 1,pageNum: this.pageNum,pageSize:10});
                if (doctorData.code === 0) {
                    this.tableData = [];
                    doctorData.data.list.forEach(item => {
                        const tableData = {};
                        tableData.doctorName = item.doctorName;
                        tableData.birthday = item.birthday;
                        tableData.title = item.title;
                        this.tableData.push(tableData);
                    })
                }else{
                    throw new Error('获取数据失败');
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
