import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/home/home.vue"),
        meta: {
            title: "首页",
            keepAlive: true
        },
        children: [
            {
                path: "/home/libary",
                name: "Libary",
                component: () => import("../views/libary/libary.vue"),
                meta: {
                    title: "音乐库",
                    keepAlive: true
                }
            },
            {
                path: "/home/libary/mv",
                name: "Play",
                component: () => import("../views/play/playmv.vue"),
                meta: {
                    title: "NV",
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/login/loginIn.vue"),
        meta: {
            title: "登录",
            keepAlive: true,
        },
    },
    {
        path: "/login/account",
        name: "Account",
        component: () => import("../views/loginAccount/account.vue"),
        meta: {
            title: "登录页面",
            keepAlive: true,
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
//   router.beforeEach((to, from, next) => {
//     if (to.name === "Login") {
//       return next()
//     }
//     if (to.name !== "Login" && !window.sessionStorage.getItem("token")) {
//       return next({ name: "Login" });
//     }

//     next()
//   });
export default router;
