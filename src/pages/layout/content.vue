<template>
    <div class="mt-2">
         <!-- 面包屑 -->
        <div class="breadcrumb d-flex align-center px-3">
            <div class="mr-2 text-gray-600">
                <i class="iconfont icon-dizhi"></i>
                <span>您的位置:</span>
            </div>
            <div>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item,index) in breadcrumbName" :key="index" :to="item.to">{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>                
            </div>
        </div>
        <!-- 标签页 -->
        <div class="pages">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            let screenWidth = window.screen.width;
            if (screenWidth < 1900) {
                this.$notify({
                    title: '提示',
                    message: '推荐您在1920*1080分辨率下面使用该系统,较低分辨率将会导致部分信息显示不完整,按住Ctrl+鼠标滑轮可以满足低分辨率需求',
                    type: 'warning'
                });
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        },
        computed: {
            breadcrumbName() {
                return this.$route.meta;
            }
        }
    };
</script>

<style lang='scss' >
    .breadcrumb {
        border-bottom: 1px solid $gray-400;
        padding-bottom: 15px;
        margin-bottom: 20px;
    }
    .pages {
        padding: 0 2em;
    }
</style>
