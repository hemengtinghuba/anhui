/*
 * http 请求详细配置
 * 认证方式采用jwt
 *
 *
 * @请求拦截钩子
 * 1.全局请求设置带上cookie
 * 2.超时时间统一设置
 * 3.设置请求头
 * 
 * @响应拦截钩子
 * 1.http状态码200
 *     1.code 0 代表请求成功
 *     2.code 403 代表登陆过期
 *     3.code 
 * 2.http状态吗不为200
 * 
 */
import axios from "axios"
import router from "../router"

const devUrl = "";
const devImgUrl = "";//图片上传url



export default {
    install: function(Vue, option) {
        axios.defaults.withCredentials = true;//允许携带cookie
        axios.defaults.baseURL = devUrl;//
        axios.defaults.timeout = 25000;//超时时间
        //===============================axios请求钩子==========================================//
        // axios.interceptors.request.use(config => {
        //     let token = localStorage.getItem("token");
        //     if (token) {
        //         config.headers.Authorization = token;
        //     }
        //     return config;
        // }, err => {
        //     return Promise.reject(err);
        // });
        //===============================axios响应钩子=======================================//
        axios.interceptors.response.use(res => {
            if (res.data.code !== 2001 ) {
                Vue.prototype.$message.error(res.data.msg);
                return Promise.reject(err);
            }else if(res.data.code === 403) {
                localStorage.clear();
                Vue.prototype.$message.error("登录已过期");
                router.push("/login");        
            }
            return res.data;
        }, err => {
            Vue.prototype.$message.error("服务器出错!");
            return Promise.reject(err)
        });       
        // if (process.env.NODE_ENV === "development") {
        //     Vue.prototype.url = devUrl;
        //     Vue.prototype.imgUrl = devImgUrl;
        // }else {
        //     Vue.prototype.url = proUrl;
        //     Vue.prototype.imgUrl = devImgUrl;
        // }
        Vue.prototype.axios = axios;
    }
};








