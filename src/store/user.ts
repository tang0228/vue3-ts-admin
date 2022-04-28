import { defineStore } from 'pinia';
import { USER_KEY } from "./common";

// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem(USER_KEY) as string) || {}
    }),
    getters: {

    },
    actions: {
        setUser(payload: object) {
            this.user = payload;
            localStorage.setItem(USER_KEY, JSON.stringify(payload));
        },
        delUser() {
            this.$reset();
            localStorage.removeItem(USER_KEY);
        }
    }
})