import request from "../../http/request"
import {GET_USER_PLAY_LIST} from "./index"
/**
 *@business {} get user profile 
 * 
**/
export const getUserAccount = ():Promise<any>=>{
    return request({
        url:"/user/account",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

/**
 *@business {} get user homePage detail 
 * 
**/
export const getUserLiked = ():Promise<any>=>{
    return request({
        url:"/user/subcount",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

export const getUserPlayList = (params:GET_USER_PLAY_LIST):Promise<any>=>{
    return request({
        url:"/user/playlist",
        method:"post",
        params
    })
}