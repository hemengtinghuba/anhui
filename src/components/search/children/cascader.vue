<template>
        <el-cascader
            v-if="!isFresh"
            :style="{width: config.inputWidth + 'px'}"
            :placeholder="config.placeholder" 
            :clearable="config.clearable"
            :size="config.size" 
            :options="options"
            :props="config.props"
            @input="handleInput"
            @active-item-change="handleItemChange"
            @change="handleChange"
        ></el-cascader>  
</template>

<script>
export default {
    props: {
        config: {
            type: Object
        }
    },
    data() {
        return {
            options: [],//需要自定义该变量，使用传递过来的options会导致死循环
            cache: [],//缓存id
            props: {},
            isFresh: false
        };
    },
   
    created() {
        if (this.config.request.url) {
            this.getCascaderData(null, this.options);
        }
    },
    watch: {
        "config.options"(newVal, oldVal) {
            if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {//config不管什么属性改变都会触发
                return
            }
            this.isFresh = true;
            this.getCascaderData(null, this.options);
        }
    },
    methods: {
        handleInput(val) {
            this.$emit("input", val);
        },
        handleItemChange(val) {
            let id = val[val.length-1];
            let node = this.findNode(val[val.length-1], this.options);
            this.getCascaderData(id, node);
        },
        getCascaderData(id, node) {
            
            let url = ~(this.config.request.url.indexOf("/")) ? this.config.request.url : ('/' + this.config.request.url)
            let method = this.config.request.method ? this.config.request.method : "get";
            this.axios({ url, method, params: {id} }).then(res => {
                res.result.forEach(val => {
                    if (this.cache.includes(val.code)) {
                        return
                    }
                    this.cache.push(val.code)
                    if (node.children) {
                        node.children.push(val);
                    }else {
                        node.push(val);
                    }
                })    
                this.isFresh = false;                
            }).catch(err => {
                this.isFresh = false;                
                console.error(err);
            })
        },
        findNode(id, node) {
            let ret = null;
            let foo = (id, node) => {
                node.forEach(val => {
                    if (val.code === id) {
                        ret = val;
                        return;
                    }else if (val.children && val.children.length > 0) {
                        foo(id, val.children)
                    }
                })
            }
            foo(id, node);
            return ret;
        },
        handleChange() {
            this.$emit("change");
        }
    }
};
</script>



<style lang="scss">

</style>
