<template>
    <div
        class="login"
        v-loading="loading"
        element-loading-text="登录中"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        element-loading-spinner="el-icon-loading">
        <form class="login-wrap" @submit.prevent="login">
            <div class="title">
                <h2 class="text-center font-weight-base text-white">aaaa</h2>
            </div>
            <div class="ipt-box username">
                <!-- <label for="username">用户名:</label> -->
                <input type="text" placeholder="用户名" v-model="params.username" id="username" autocomplete="off" >
            </div>
            <div class="ipt-box password">
                <!-- <label for="password">密码:</label> -->
                <input type="password" placeholder="密码" v-model="params.password" id="password">
            </div>
            <div class="ipt-box code">
                <input type="text" placeholder="验证码" v-model="params.code" id="code" class="w-75" autocomplete="off">
                <div class="code-img">123</div>
            </div>
            <div class="ipt-box submit">
                <button type="submit">登录</button>
            </div>
        </form>
    </div>
</template>

<script>
    // import qs from "qs"
    export default {
        data () {
            return {
                params: {
                    username: "",
                    password: "",
                    code: ""
                },
                loading: false
            }
        },
        methods: {
            login() {
                // this.axios.post("/login", qs.stringify(this.params)).then(res => {
                //     this.loading = false;
                //     localStorage.removeItem("login");
                //     localStorage.setItem("login", true);
                //     this.$message.success("登录成功");
                //     this.$router.push("/a");
                // }).catch(err => {
                //     console.error(err);
                //     this.loading = false;
                // });
                
            }
        }
    }
</script>
<style lang="scss">
    .login {
        width: 100%;
        min-height: 100vh;
        background: #17293a;
        // background: url(../../../public/img/login-img.png) no-repeat;
        // background-size: 100%;
    }
    .login-wrap {
        width: 500px;
        padding: 3em 0 8em 0;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        z-index: 999;
    }
    .ipt-box {
        display: flex;
        align-items: center;
        padding: 1em 4em;
        &.code {
            justify-content: flex-start;
        }
        input {
            background: none;
            color: #fff;
            width: 100%;
            border: 1px solid #999;
            height: 3.4em;
            line-height: 3em;
            padding-left: 1em;
            border-radius: 4px;
        }
        button {
            display: inline-block;
            background: #fff;
            border: none;
            padding: 1em 0;
            width: 100%;
            cursor: pointer;
            border-radius: 2em;
            color: #fff;
            background: #369;
            &:hover {
                background: rgb(56, 98, 139);
            }
        }
        #code {
            width: 40%;
        }
        .code-img {
            background: rgba(255,255,255, .1);
            cursor: pointer;
            height: 3.4em;
            width: 40%;
            margin-left: 2em;
        }
    }
</style>
