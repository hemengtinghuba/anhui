import Vue from "vue";
import Router from "vue-router";
import login from "../pages/login/login";

Vue.use(Router);

export default new Router({
    // mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
        {
            path: "/home",
            name: "home",
            component: () => import("@/pages/layout/main.vue"),
            children: [
                {
                    path: "/a",
                    name: "a",
                    meta: [{
                        to: "/home",
                        title: "商品管理"
                    }],
                    component: () => import("@/pages/a/a.vue")
                },
                {
                    path: "/b",
                    name: "b",
                    meta: [{
                        to: "/home",
                        title: "商品分类"
                    }],
                    component: () => import("@/pages/b/b.vue")
                },
                {
                    path: "/c",
                    name: "c",
                    component: () => import("@/pages/c/c.vue")
                }
            ]
        }
    ]
});
