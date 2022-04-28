import Mock from "mockjs";
import qs from "query-string";

const avatar = [
    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
    "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
];

// 留言列表
Mock.mock(/\/api\/message\/?(\?.+)?$/, "get", (options: any) => {
    const query = qs.parse(options.url)
    return Mock.mock({
        code: 200,
        msg: "ok",
        [`data|${query.limit || 10}`]: [
            {
                id: "@id",
                nickname: "@cname",
                commentTime: "@date",
                content: "@cparagraph(5, 8)",
                "avatar|1": avatar,
            }
        ]
    })
});

// 提交留言
Mock.mock("/api/message", "post", {
    code: 200,
    msg: "ok",
    data: {
        id: "@id",
        nickname: "@cname",
        commentTime: "@date",
        content: "@cparagraph(5, 8)",
        "avatar|1": avatar,
    }
})