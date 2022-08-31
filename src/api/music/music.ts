import request from "../../http/request"
import {GET_USER_PLAY_LIST} from "./index"

/**
 * @business {用户喜欢}
 * @params {null}
 * **/
export const getUserLiked = ():Promise<any>=>{
    return request({
        url:"/user/subcount",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

/**
 * @business {用户歌单}
 * @params {必选：用户id} {可选：limit，offset}
 * **/
export const getUserPlayList = (params:GET_USER_PLAY_LIST):Promise<any>=>{
    return request({
        url:"/user/playlist",
        method:"post",
        params
    })
}
/**
 * @business {用户喜欢音乐}
 * @params {必选：歌单id} {可选：limit，offset}
 * **/
export const getUserLikedMusics = (params:GET_USER_PLAY_LIST):Promise<any>=>{
    params.timesamp = new Date().getTime()
    return request({
        url:"/playlist/track/all",
        method:"get",
        params
    })
}
/**
 * @business {歌单详情}
 * @params {必选：歌单id} 
 * **/
export const getPlayListDetail = (id:string):Promise<any>=>{
    return request({
        url:"/playlist/detail",
        method:"get",
        params:{
            id:id,
            timesamp:new Date().getTime()
        }
    })
}
/**
 * @business {喜欢音乐详情}
 * @params {必选：歌曲id} 
 * **/
export const getMusicDeatil = (id:string):Promise<any>=>{
    return request({
        url:"/song/url",
        method:"get",
        params:{
            id:id,
            timesamp:new Date().getTime()
        }
    })
}
/**
 * @business {用户收藏专辑}
 * @params {可选：limit，offset}
 * **/
export const getAlbumList = ()=>{
    return request({
        url:"/album/sublist",
        method:"get",
        params:{
            limit:20,
            offset:0,
            timesamp:new Date().getTime()
        }
    })
}

/**
 * @business {最近播放音乐}
 * @params {null}
 * **/

export const getUserRecentlyPlayed = ()=>{
    return request({
        url:"/record/recent/song",
        method:"get",
        params:{
            timesamp:new Date().getTime()
        }
    })
}

/**
 * @business {播放音乐记录}
 * @params {必选:用户id}
 * **/

 export const getUserPlayedReocrd = (id:string,type?:number)=>{
    return request({
        url:"/user/record",
        method:"get",
        params:{
            uid:id,
            type:type,
            timesamp:new Date().getTime()
        }
    })
}