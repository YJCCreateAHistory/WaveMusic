import request from "../../http/request"
import {HTTP_RES_DATA} from  "../../types/httpTypes/index"

/**
 * @business {用户收藏MV}
 * @params {null}
 * **/
 export const getMvList = ():Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/mv/sublist",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

/**
 * @business {MV详情}
 * @params {必选：MV的id}
 * **/
export const getMvDetailById = <U>(id:U):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/mv/detail",
        method:"get",
        params:{
            mvid:id
        }
    })
}
/**
 * @business {视频详情}
 * @params {必选：MV的id}
 * **/
 export const getVideoDetailById = <K>(vid:K):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/video/detail",
        method:"get",
        params:{
            id:vid
        }
    })
}

/**
 * @business {视频地址}
 * @params {必选：视频的id}
 * **/
 export const getVideoDetailUrlById = <T>(vid:T):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/video/url",
        method:"get",
        params:{
            id:vid
        }
    })
}

/**
 * @business {MV地址}
 * @params {必选：MV的id}
 * **/
 export const getMvDetailUrlById = <T>(id:T):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/mv/url",
        method:"get",
        params:{
            id:id
        }
    })
}