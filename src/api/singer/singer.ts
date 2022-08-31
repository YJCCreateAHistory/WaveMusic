import request from "../../http/request"
/**
 * @business {用户喜欢歌手}
 * @params {必选：id}
 * **/
export const getUserLikeSinger = (id:string)=>{
    return request({
        url:"/user/follows",
        method:"get",
        params:{
            uid:id,
            timesamp:new Date().getTime()
        }
    })
}

export const getUserFollowed = (id:string)=>{
    return request({
        url:"/user/followeds",
        method:"get",
        params:{
            uid:id,
            timesamp:new Date().getTime()
        }
    })
}