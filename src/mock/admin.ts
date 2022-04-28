import Mock from "mockjs";

interface IUser {
    id: number,
    username: string,
    password: string,
    avatarUrl: string
}

const users: IUser[] = [
    {id: 1, username: "admin", password: "admin", avatarUrl: "https://joeschmoe.io/api/v1/random"},
    {id: 2, username: "user123", password: "user123", avatarUrl: "https://joeschmoe.io/api/v1/random"},
]

Mock.mock("/api/login", "post", (options: any) => {
    const params = JSON.parse(options.body);
    const username = params.username;
    const password = params.password;
    const res = users.find(u => u.username === username && u.password === password);
    if(!res) {
        return Mock.mock({
            code: -1,
            msh: '用户名或密码错误',
            data: null,
        })
    }
    return Mock.mock({
        code: 200,
        msg: "ok",
        data: res,
    })
})

Mock.mock("/api/logon", "GET", {
    code: 200,
    msg: "ok",
    data: Date.now()
})