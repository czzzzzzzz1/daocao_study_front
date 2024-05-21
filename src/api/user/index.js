import request from "@/utils/request";
// 登录接口
export function searchSelfRouter(){

    return request({
        url:'sys/menu/self',
        method:'GET',
    })
}