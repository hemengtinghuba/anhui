<template>
    <div>
        <s-search title="筛选条件" :search-data="searchData" @search="handleSeach" class="mb-3"></s-search>
        <s-table
            title="商品数据"
            :table-data="tableData"
            ref="table"
            @selectionChange="handleSelectionChange"
        ></s-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchData: [
                {
                    label: "商品名称：",
                    type: "input",
                    labelWidth: 64,
                    inputWidth: 250,
                    width: 30,
                    size: "mini",
                    placeholder: "--请输入商品名称--",
                    trigger: [],
                    vModel: "name",
                    clearable: true,
                    rules: [],
                    limit: {},
                    options: [],
                    props: { label: "label", value: "_id" },
                    request: { url: "", method: "get" }
                }
            ],
            tableData: {
                tables: [
                    {
                        label: "",
                        value: 1,
                        tableInfo: [
                            {
                                label: "商品名称",
                                prop: "date"
                            },
                            {
                                label: "售价",
                                prop: "area"
                            },
                            {
                                label: "库存",
                                prop: "id"
                            },
                            {
                                label: "虚拟销量",
                                prop: "inspection_project"
                            },
                            {
                                label: "操作",
                                prop: "operate",
                                width: 300,
                                operate: [
                                    {
                                        type: "jump",
                                        btn: {
                                            text: "编辑",
                                            type: "text",
                                            size: "mini"
                                        },
                                    },
                                    {
                                        type: "delete",
                                        btn: {
                                            text: "删除",
                                            type: "text",
                                            size: "mini"
                                        },
                                        action: {
                                            confirm: {
                                                title: "确定删除任务吗",
                                                content: "该操作无法逆转"
                                            },
                                            request: {
                                                url: "/delete",
                                                method: "delete",
                                                idName: "_id"
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        selection: false
                    }
                    
                ],
                tableInfo: [],
                config: {
                    request: {
                        url: "/table",
                        method: "get"
                    }
                }
            }
        };
    },
    methods: {
        handleSeach() {},
        handleSelectionChange() {

        }
    }
};
</script>
<style lang="scss">
    .a {
        color: #45a;
    }
</style>