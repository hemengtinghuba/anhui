<template>
    <div class="header">
        <div>
            <router-link to="/home">后台管理系统</router-link>
        </div>
        <div class="setting" @mouseover="settingVisible = true" @mouseout="settingVisible = false">
            <!-- 头像 -->
            <img src="/public/img/logo.jpg" alt="头像" class="round-face">
            <!-- 用户设置 -->
            <div class="more-setting">
                <span class="user-name">&nbsp;&nbsp;&nbsp;周杰伦&nbsp;</span>
                <span class="icon-jiantou iconfont"></span>
                <transition name="fade">
                    <div class="list-wrap" v-show="settingVisible">
                        <ul class="setting-list">
                            <li >修改密码</li>
                            <li >退出登陆</li>
                        </ul>                    
                    </div>                    
                </transition> 
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                settingVisible: false
            };
        },
    }
</script>

<style lang='scss'>
    .header {
        height: $header-height;
        background: $header-background-color;
        color: $header-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 $header-padding-right 0 $header-padding-left;
    }
    .setting {
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        .more-setting {
            position: relative;
            display: flex;
            align-items: center;
            .iconfont {
                transform: rotate(90deg)
            }
        }
        .list-wrap {
            position: absolute;
            left: -50%;
            padding-top: $header-height/4;
            top: $header-height / 2;
            cursor: pointer;
        }
        .setting-list {
            transition: all .3s;
            box-shadow: $box-shadow-sm;
            border-radius: $border-radius-sm;
            background-color: #fff;
            color: $gray-600;
            padding: .7em 0;
            >li {
                &:hover {
                    cursor: pointer;
                    background: #f3f3f3;
                }
                &:first-of-type {
                    border-top: 1px solid $gray-200;
                }
                transition: all .3s;
                margin: .4em 0;
                padding: .8em 2em;
                border-bottom: 1px solid $gray-200;
                white-space: nowrap;
            }
        }
    }
       
</style>
