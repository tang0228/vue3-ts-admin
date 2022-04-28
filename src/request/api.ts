import ins from "./ins";

/**
 * 获取用户列表
 * @returns 
 */
export function getList() {
    return ins.get('/api/list');
}

/**
 * 登录
 * @param username 
 * @param password 
 * @returns 
 */
export function login(username: string, password: string) {
    return ins.post('/api/login', {
        username, password
    })
}

/**
 * 退出登录
 * @returns 
 */
export function logon() {
    return ins.get('/api/logon');
}

/**
 * 获取留言列表
 * @returns 
 */
export function getMessage(limit: number) {
    return ins.get("/api/message", {
        params: {
            limit
        }
    });
}

/**
 * 提交留言
 * @param nickname 
 * @param content 
 * @returns 
 */
export function postMessage(nickname: string, content: string) {
    return ins.post("/api/message", {
        nickname, content
    })
}