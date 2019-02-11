<template>
    <div class="s-card" v-loading="loading">
        <header class="card-header">
            <div class="title">{{title}}</div>
        </header>
        <slot name="top"></slot>
        <!-- tabs -->
       
        <section v-if="tableData.tables && tableData.tables.length > 0 && tableData.tables[0].label" class="table-tabs">
            <div class="center">
                <el-tabs  @tab-click="handleTabsClick" v-model="queryConfig.type">
                    <el-tab-pane :label="item.label" :name="item.value + ''"  v-for="(item, index) in tableData.tables" :key="index">
                        <el-table :data="tableInfo" stripe border size="mini" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55" v-if="item.selection"></el-table-column>
                            <el-table-column :prop="item2.prop" :label="item2.label" align="center" v-for="(item2, index2) in item.tableInfo" :key="index2" :width="item2.width">
                                <template slot-scope="scope">
                                    <slot :row="scope.row" name="key" v-if="item2.prop == 'key'"></slot>
                                    <slot :row="scope.row" name="operate" v-if="item2.prop == 'operate'"></slot>
                                    <div v-else>{{scope.row[item2.prop]}}</div>
                                    <el-button 
                                        v-if="item2.operate.length > 0"
                                        v-for="(val, i) in item2.operate"
                                        :key="i"
                                        @click="handleBtnClick(scope.row, val)"
                                        :size="val.btn.size" 
                                        :type="val.btn.type" 
                                        >{{val.btn.text}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            style="float: right;margin-top: 1em;"
                            background
                            :pager-count="5"
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            layout="prev,pager,next"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </section>
        <section v-if="tableData.tables && tableData.tables.length > 0 && !tableData.tables[0].label" class="table-tabs">
            <div class="center">
                <el-table :data="tableInfo" stripe border size="mini" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" v-if="tableData.tables[0].selection"></el-table-column>
                    <el-table-column :prop="item2.prop" :label="item2.label" align="center" v-for="(item2, index2) in tableData.tables[0].tableInfo" :key="index2" :width="item2.width">
                        <template slot-scope="scope">
                            <slot :row="scope.row" name="key" v-if="item2.prop == 'key'"></slot>
                            <slot :row="scope.row" name="operate" v-if="item2.prop == 'operate'"></slot>
                            <div v-else>{{scope.row[item2.prop]}}</div>
                            <el-button 
                                v-if="item2.operate.length > 0"
                                v-for="(val, i) in item2.operate"
                                :key="i"
                                @click="handleBtnClick(scope.row, val)"
                                :size="val.btn.size" 
                                :type="val.btn.type" 
                                >{{val.btn.text}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="float: right;margin-top: 1em;"
                    background
                    :pager-count="5"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev,pager,next"
                    :total="total">
                </el-pagination>
            </div>

        </section>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: "请输入标题"
        },
        //table数据
        tableData: {
            type: Object,
            default() {
                return {}
            }
        },
       
    },
    data() {
        return {
            tableInfo: [],//------后台获取的table数据
            queryConfig: {
                type: "",
                pageSize: 10,
                pageNum: 1,
            },//--------查询参数
            //=========================其他参数=========================//
            total: 1,//总数
            loading: false,//加载按钮
            selectRows: [],//table选择
        };
    },
    watch: {
        tableData: {
            handler() {
                if (this.tableData.tables && this.tableData.tables[0].value) {
                    this.queryConfig.type = this.tableData.tables[0].value.toString();
                }
            },
            deep: true
        }
    },
    created() {
        if (this.tableData.tables && this.tableData.tables[0].value) {
            this.queryConfig.type = this.tableData.tables[0].value.toString();
            this.getTableData();
        }

    },
    methods: {

        //=====================================tabs点击切换====================================//
        handleTabsClick(val) {
            this.$emit("tabsClick",222);
            this.getTableData();
        },
        //=====================================多选table数据====================================//
        handleSelectionChange(rows) {
            this.selectRows = rows.map(row => {
                return row.id;
            });
            this.$emit("selectionChange", rows, this.selectRows);
        },
        //=====================================获取table数据====================================//
        getTableData(search) {
            let params = {};
            if (search) {
                params = Object.assign(search, this.queryConfig)
            }else {
                params = Object.assign({}, this.queryConfig)
            }
            let url = ~(this.tableData.config.request.url.indexOf("/")) ? this.tableData.config.request.url : ('/' + this.tableData.config.request.url)
            let method = this.tableData.config.request.method ? this.tableData.config.request.method : "get";
            this.loading = true;
            this.axios({
                url,
                method,
                params
            }).then(res => {
               this.tableInfo = res.result.data;
               this.total = res.result.total;
               this.loading = false;
            }).catch(err => {
                console.error(err);
                this.loading = false;
            })
        },
        //=====================================响应按钮操作====================================//
        handleBtnClick(row, params) {
            if (params.type === "delete") {
                // let {title, content} = params.action.confirm;
                let {url, idName} = params.action.request;
                if (!row[idName]) {
                    throw new Error("数据中不存在指定id的值");
                }
                let ids = row[idName];
                this.deleteData(ids, params);
            }else if (params.type === 'jump') {
                let jump = params.action.jump;
                let path = jump.path;
                let query = {};
                query[jump.query] = row[jump.query];
                this.$router.push({
                    path: jump.path,
                    query
                });
            }

            console.log(row, params)
        },
        //=====================================删除某条数据====================================//
        deleteData(ids, params) {
            let {title, content} = params.action.confirm;
            let {url, idName} = params.action.request;

            this.$confirm(content, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true;
                this.axios.delete(url, {params: {id: ids}}).then(res => {
                    this.$message.success("删除成功");
                    this.loading = false;
                    this.getTableData();
                }).catch(err => {
                    this.$message.error("删除失败");
                    console.error(err);
                    this.loading = false;
                });
            }).catch(() => {
                
            });
        },
        //=====================================翻页====================================//
        handleCurrentChange(page) {
            this.queryConfig.pageNum = page;
            this.getTableData();
        },
        handleSizeChange(size) {
            this.queryConfig.pageSize = size;
            this.getTableData();
        }
    }
};
</script>



<style lang="scss">
    .s-card {
        width: 100%;
        border: 1px solid #e3e8ee;
        background: #fff;
        border-radius: 3px;
        header {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #e3e8ee;
            .title {
                padding-left: .5em;
                font-weight: bolder;
                border-left: 4px solid #39f;
            }
        }
      

        .table-tabs {
            display: flex;
            justify-content: center;
            .center {
                width: 100%;
            }
        }
    }
    .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
    }
</style>