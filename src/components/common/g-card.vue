<template>
    <div class="s-card" v-if="!hide">
        <div class="s-card-title" @click.prevent.stop="toggleFold">
            <h2>{{title}}</h2>
        </div>
        <div class="s-card-content" :class="{active: isFold}">
            <slot name="content"></slot>
            <slot>content...</slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "请输入title..."
        },
        fold: {
            type: Boolean,
            default: true
        },
        hide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isFold: this.fold,
        }
    },
    methods: {
        toggleFold() {
            this.isFold = !this.isFold;
        }
    },
    
};
</script>



<style lang="scss">
    .s-card {
        position: relative;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 1rem;
        .s-card-title {
            cursor: pointer;
            padding: 1rem ;
            border-bottom: 1px solid #eee;
            h2 {
                color: rgb(67, 113, 160);
                font-size: 14px;
                font-weight: normal;
                margin: 0;
            }
        }
        .s-card-content {
            // padding: 1rem 2rem;
        }
      
        .active {
            height: 0;
            padding: 0;
            overflow: hidden;
        }
    }
</style>
