import request from "../../http/request"
/**
 * @business {用户收藏MV}
 * @params {null}
 * **/
 export const getMvList = ()=>{
    return request({
        url:"/mv/sublist",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}