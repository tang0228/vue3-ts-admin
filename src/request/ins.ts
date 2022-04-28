import axios, { AxiosResponse } from "axios";

const ins = axios.create(); // 创建axios实例

ins.interceptors.response.use((res: AxiosResponse) => {
    return res.data;
}, (error: any) => {
    console.log(error)
});

export default ins;