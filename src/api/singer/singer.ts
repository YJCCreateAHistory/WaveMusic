import request from "../../http/request"
import {HTTP_RES_DATA} from  "../../types/httpTypes/index"

/**
 * @business {用户喜欢歌手}
 * @params {必选：id}
 * **/
export const getUserLikeSinger = <T>(id:T):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/user/follows",
        method:"get",
        params:{
            uid:id,
            timesamp:new Date().getTime()
        }
    })
}

export const getUserFollowed = <T>(id:T):Promise<HTTP_RES_DATA>=>{
    return request({
        url:"/user/followeds",
        method:"get",
        params:{
            uid:id,
            timesamp:new Date().getTime()
        }
    })
}