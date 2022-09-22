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
        ]
    },
    {
        path: "/libary",
        name: "Libary",
        component: () => import("../views/libary/libary.vue"),
        meta: {
            title: "音乐库",
            keepAlive: true
        }
    },
    {
        path: "/libary/mv",
        name: "Play",
        component: () => import("../views/play/playmv.vue"),
        meta: {
            title: "MV",
            keepAlive: true
        }
    },
    {
        path:"/libary/musics/:id",
        name:"Musics",
        component: () => import("../views/play/playdetail.vue"),
        meta:{
            title:"歌单详情",
            keepAlive: true
        }
    },
    {
        path:"/mv",
        name:"MV",
        component:() => import("../views/MVhub/index.vue"),
        meta:{
            title:"MVS",
            keepAlive: true
        }
    },
    {
        path:"/find",
        name:"Find",
        component:() => import("../views/discovery/index.vue"),
        meta:{
            title:"find",
            keepAlive: true
        }
    },
    {
        path:"/friend",
        name:"Friend",
        component:() => import("../views/friend/index.vue"),
        meta:{
            title:"friend",
            keepAlive: true
        }
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
//     if (to.name !== "Login" && !window.sessionStorage.getItem("MUSCI_U")) {
//       return next({ name: "Login" });
//     }

//     next()
//   });
export default router;
