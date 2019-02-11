<template>
<div>
    <el-select 
        :style="{width: config.inputWidth + 'px'}"
        :value="value"
        @change="handleChange" 
        @clear="handleClear" 
        @input="handleInput"
        :size="config.size" 
        :clearable="config.clearable" >
        <el-option 
            v-for="(item, index) in config.options" 
            :label="item[config.props ? config.props.label : item.label]"
            :value="item[config.props ? config.props.value : item.value]"
            :key="index" >
        </el-option>
    </el-select>    
</div>

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
            // options: [],
            value: ""
        };
    },
    watch: {
    },
    created() {
        this.initSelectData();
        //console.log(this.options)
    },
    methods: {
        initSelectData() {
            if (this.config.request && this.config.request.url) {
                this.getData();
            }else if (!this.config.options){
                throw new Error("options和request必须传递一个");
            }else {
                //this.options = this.config.options;
            }
        },
        //=====================================获取表格数据====================================//
        getData() {
            let url = ~(this.config.request.url.indexOf("/")) ? this.config.request.url : ('/' + this.config.request.url)
            let method = this.config.request.method ? this.config.request.method : "get";
            this.axios({
                url,
                method
            }).then(res => {
               this.config.options = res.result
            }).catch(err => {
                console.error(err);
            })
        },
        //=====================================触发input事件====================================//
        handleInput(val) {
            this.value = val;
            this.$emit("input", val);
        },
        //=====================================触发change和clear事件====================================//
        handleChange() {
            this.$emit("change");
        },
        handleClear() {
            this.$emit("clear");
        }
    }
};
</script>
