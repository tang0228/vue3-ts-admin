import Mock from "mockjs";
import { hobbys } from "./data";

export interface IUser {
    id?: string
    name: string
    birthday: String
    city: string
    avatarUrl: string
    hobby: string[]
    description: string
}

Mock.mock('/api/list', 'get', () => {
    return Mock.mock({
        code: 200,
        msg: "ok",
        "data|40-80": [
            {
                id: "@id",
                name: "@cname",
                birthday: "@date",
                city: "@city",
                email: "@email",
                avatarUrl: "@image(32x32, @color, #ccc, @cname)",
                "hobby|1": hobbys,
                description: "@cparagraph(5, 8)",
            }
        ],
    })
})

