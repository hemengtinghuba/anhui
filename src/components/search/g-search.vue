


<template>
    <div class="s-card">
        <header class="card-header">
            <div class="title">{{title}}</div>
        </header>
        <!-- 搜索 -->
        <section class="search" v-if="searchData.length > 0">
            <div v-for="(item, index) in searchData" :key="index" :style="{width: item.width + '%'}" class="search-item" >
                <div >
                    <div class="label">
                        <span :style="{width: item.labelWidth + 'px'}" v-if="item.type !== 'button' && item.type !== 'reset'">{{item.label}}</span>
                        <div >
                            <!-- 普通input框 -->
                            <el-input 
                                v-if="item.type === 'input'"
                                :style="{width: item.inputWidth + 'px'}"
                                :size="item.size" 
                                :placeholder="item.placeholder" 
                                :clearable="item.clearable"
                                @blur="handleReact(item.trigger, 'blur')" 
                                @change="handleReact(item.trigger, 'change')" 
                                @focus="handleReact(item.trigger, 'focus')" 
                                @clear="handleReact(item.trigger, 'clear')" 
                                v-model="params[item.vModel]" 
                                >
                            </el-input>
                            <!-- 普通按钮 -->
                            <el-button 
                                :size="item.size"  
                                :type="item.style" 
                                v-if="item.type === 'button'" 
                                @click="handleReact(item.trigger, 'click')">
                                {{item.label}}
                            </el-button>
                            <!-- 重置按钮 -->
                            <el-button 
                                :size="item.size"  
                                :type="item.style" 
                                v-if="item.type === 'reset'" 
                                @click="handleReset(item.trigger, 'click')">
                                {{item.label}}
                            </el-button>
                            <!-- 普通选择框 -->
                            <s-select 
                                v-if="item.type === 'select'" 
                                :config="item" 
                                v-model="params[item.vModel]" 
                                @change="handleReact(item.trigger, 'change')" 
                                @clear="handleReact(item.trigger, 'clear')">
                            </s-select>
                            <!-- 普通级联选择 -->
                            <s-cascader
                                v-if="item.type === 'cascader'"
                                :config="item"
                                v-model="params[item.vModel]"
                                @change="handleReact(item.trigger, 'change', 'cascader', item.vModel)"
                            ></s-cascader>
                            <!-- 时间选择器 -->
                            <el-date-picker
                                :style="{width: item.inputWidth + 'px'}"
                                v-if="item.type === 'datePicker' && isShowDatePicker"
                                :clearable="item.clearable"
                                :size="item.size" 
                                @change="handleReact(item.trigger, 'change')"
                                :format="item.format"
                                :value-format="item.valueFormat"
                                v-model="params[item.vModel]"
                                :picker-options="{disabledDate(time) { return limitTime(item.limit, time) }}"
                                type="date"
                                :placeholder="item.placeholder">
                            </el-date-picker>
                            <!-- 日期范围选择器 -->
                            <el-date-picker
                                :style="{width: item.inputWidth + 'px'}"
                                v-if="item.type === 'datePickerRange'"
                                :clearable="item.clearable"
                                :size="item.size" 
                                type="daterange"
                                range-separator="-"
                                @change="handleReactTime(item.trigger, 'change', 'datePickerRange', item.vModel)"
                                :format="item.format"
                                :value-format="item.valueFormat"
                                v-model="time.__time"
                                :picker-options="{disabledDate(time) { return limitTime(item.limit, time) }}"
                                :start-placeholder="item.placeholder[0]"
                                :end-placeholder="item.placeholder[1]"
                                >
                            </el-date-picker>
                        </div>
                    </div>
                </div>                    
            </div>
              
        </section>
      
    </div>
</template>

<script>
import cascader from "./children/cascader"
import select from "./children/select"
export default {
    components: {
        "s-cascader": cascader,
        "s-select": select,
    },
    props: {
        title: {
            type: String,
            default: "请输入标题"
        },
        //搜索条件
        searchData: {
            type: Array,
            default() {
                return [];
            } 
        },

    },
    watch: {
        //防止vModel改变的时候数据重复绑定
        searchData: {
            handler() {
                this.params = {};
                this.isShowDatePicker = false;
                this.$nextTick(() => {
                    this.isShowDatePicker = true
                })   
            },
            deep: true
        },
       
    },


    data() {
        return {
            params: {},//---------请求参数
            time: {
              __time: "",//-------时间对象
            },
            cascaderOptions: {},//级联选择器参数
            //=====================================其他====================================//
            isShowDatePicker: false
        };
    },
   
    
    
    methods: {
        //=====================================处理时间格式====================================//
        handleReactTime(allTrigger, trigger, type, key) {
            
            if (type === "datePickerRange") {
                if (!Array.isArray(key) || key.length !== 2) {
                    throw new Error("dataRange绑定值必须为数组");
                }
                this.params[key[0]] = this.time.__time ? this.time.__time[0] : "";
                this.params[key[1]] = this.time.__time ? this.time.__time[1] : "";
            }
            if (typeof allTrigger === "string") {
                if (allTrigger === trigger) {
                    this.$emit("search", this.params);
                }
            }else if (Array.isArray(allTrigger)) {
                if (allTrigger.includes(trigger)) {
                    this.$emit("search", this.params);
                }
            }
        },
      
        //=====================================处理重置====================================//
        handleReset(allTrigger, trigger) {
            let params = Object.assign({}, this.params);
            if (typeof allTrigger === "string") {
                if (allTrigger === trigger) {
                    this.$emit("reset", params);
                    this.params = {};
                    this.time.__time = ""
                }
            }else if (Array.isArray(allTrigger)) {
                if (allTrigger.includes(trigger)) {
                    this.$emit("reset", params);
                    this.params = {};
                    this.time.__time = ""
                }
            }
        },
        //=====================================处理其他交互====================================//
        handleReact(allTrigger, trigger, type, key) {
            let params = Object.assign({}, this.params);
            this.searchData.forEach(val => {
                if (val.type === "cascader" && val.returnType && val.returnType === "string") {
                    if (params[val.vModel] != null) {
                        params[val.vModel] = params[val.vModel].join(",");
                    }
                }
            })
            if (typeof allTrigger === "string") {
                if (allTrigger === trigger) {
                    this.$emit("search", params);
                }
            }else if (Array.isArray(allTrigger)) {
                if (allTrigger.includes(trigger)) {
                    this.$emit("search", params);
                }
            }
        },
        //=====================================时间限制====================================//
        limitTime(rule, time) {
            const ruleOperate = [];
            for(let i in rule) {
                if (!Object.prototype.toString.call({}).slice(8,-1) === "Date") {
                    throw new Error("格式必须为Date类型");
                }
                if (i === "$gt") {
                    return time.valueOf() < rule[i].valueOf();
                }else if (i === "$gte") {
                    return time.valueOf() - rule[i].valueOf() < -86400 * 1000;
                }else if (i === "$lt") {
                    return time.valueOf() - rule[i].valueOf() > -86400 * 1000;
                }else if (i === "$lte") {
                    return time.valueOf() > rule[i].valueOf()  ;
                }
            }
        },
        //=========================================================================//
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
        .search {
            padding: 1rem;
            .search-item {
                display: inline-flex;
                margin-bottom: 1rem;
            }

            .label {
                color: #666;
                font-size: 12px;
                display: flex;
                align-items: center;
            }
        }
    }
</style>
