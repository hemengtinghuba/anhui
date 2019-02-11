<template>
    <div class="tabs">
        <div class="fold" @click="expand">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="tab-list" >
            <div class="item active">
                <span class="item-text">销售统计</span>   
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="item">
                <span class="item-text">销售统计2</span>   
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="item">
                <span class="item-text">销售统计3</span>   
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="item">
                <span class="item-text">销售统计4</span>   
                <i class="iconfont icon-guanbi"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        expand() {
            this.$store.commit("toggleBanner");
        }
    },
}
</script>

<style lang="scss">
    .tabs {
        width: 100%;
        height: 50px;
        background: #dee1e6;
        display: flex;
        .fold {
            margin: 0 1rem;
            height: 50px;
            width: 30px;
            line-height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            span {
                transition: all .33s;
                display: inline-block;
                width: 100%;
                height: 3px;
                background: #777;
                &:nth-of-type(1) {
                    transform: translate(0, -4px)
                }
                &:nth-of-type(2) {
                    height: 2px;
                }
                &:nth-of-type(3) {
                    transform: translate(0, 4px)
                }
            }
            &:hover span:nth-of-type(1) {
                transform: translate(0, -6px)
            }
            &:hover span:nth-of-type(3) {
                transform: translate(0, 6px)
            }
        }
        .tab-list {
            width: 100%;
            line-height: 50px;
            height: 50px;
            display: flex;
            color: #5f6368;
            .item {
                position: relative;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 0 0 20%;
                max-width: 200px;
                cursor: pointer;
                padding: 0 1rem;
                background: rgb(222, 225, 230);
                .iconfont {
                    position: absolute;
                    right: 1rem;
                    font-size: 12px;
                }
                &::after {
                    content: "";
                    display: inline-block;
                    height: 50%;
                    position: absolute;
                    transform: translate(0, -50%);
                    right: 0;
                    top: 50%;
                    width: 1px;
                    background: #aaa;

                }
                &.active {
                    background: #f0f3fa;
                    &::after {
                        width: 0;
                    }
                }
            }
        }
    }
</style>
