export default {
    /**
     * 获取某范围内的随机整数
     * @param min 最小值
     * @param max 最大值
     * @returns 
     */
    getRandomIntNum(min: number, max: number) {
        return Math.round(Math.random() * (max - min)) + min;
    }
}