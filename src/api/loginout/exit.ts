import request from "../../http/request"
export const loginout = ()=>{
    return request({
        url:"/logout",
        method:"get",
        params:{
            timesamp:new Date().getTime(),
        }
    })
}