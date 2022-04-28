import { createRouter, Router, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { USER_KEY } from "../store/common"

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const localUser = JSON.parse(localStorage.getItem(USER_KEY) as string);
    if (to.path.startsWith("/login")) {
        if (localUser) {
            // 已经登录
            next("/")
        }
        next();
    } else {
        if (localUser) {
            next();
        } else {
            next("/login")
        }
    }
})

export default router;