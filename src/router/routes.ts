import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        name: "index",
        path: "/",
        component: () => import("@/pages/index/Index.vue"),
        meta: {
            title: "首页",
            exact: true,
        },
        children: [
            {
                name: 'list',
                path: '/list',
                component: () => import("@/pages/list/List.vue"),
                meta: {
                    title: '列表',
                    exact: true,
                }
            },
            {
                name: 'about',
                path: "/about",
                component: () => import("@/pages/about/About.vue"),
                meta: {
                    title: '关于我',
                    exact: true,
                }
            },
            {
                name: 'message',
                path: "/message",
                component: () => import("@/pages/message/Message.vue"),
                meta: {
                    title: '留言板',
                    exact: true,
                }
            },
        ]
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/login/Login.vue"),
        meta: {
            title: "登录",
            exact: true,
        }
    }

];

export default routes;
