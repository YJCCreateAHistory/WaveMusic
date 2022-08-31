import { isLoginedIn, isAccountLoginedin } from "../utils/cookie"
import { getUserAccount, getUserDetail } from "../api/account/userAccount"
import {
    getUserLiked,
    getUserPlayList,
    getUserLikedMusics,
    getPlayListDetail,
    getMusicDeatil
} from "../api/music/music"
import { USER_ACCOUNT } from "./types/index"

export default {
    // user profile
    // getUserProfile: ({ state, commit }: any): void | Promise<any> => {
    //     if (!isAccountLoginedin(state.data.loginMode)) {
    //         return
    //     } else {
    //         return getUserAccount().then(async (res: USER_ACCOUNT) => {
    //             if (res.data.code === 200) {
    //                 const { data } = res
    //                 const detail = await getUserDetail(data.account.id)
    //                 commit("updateData", { key: "user", value: { account: data.account, detail: detail } })
    //             }
    //         })
    //     }
    // },
    getUserAccountProfile: ({ state, commit }: any): void | Promise<any> => {
        if (isLoginedIn()) {
            // get user detail
            return getUserDetail(state.data.userData.account.id).then((res: USER_ACCOUNT) => {
                if (res.data.code === 200) {
                    commit("getUserDetailInfo",
                        {
                            key: "detailInfo",
                            value: res.data
                        })
                }
            })
        }
    },
    // user playlist
    getUserLikePlayList: ({ state, commit }: any): void | Promise<any> => {
        if (isLoginedIn()) {
            let params = {
                uid: state.data.userData.account.id,
                limit: 2000,
                offset: 0,
                timesamp: new Date().getTime()
            }
            return getUserPlayList(params).then(async (res: USER_ACCOUNT) => {
                // submit playlist
                if (res.data.code === 200) {
                    commit("updateUserPlayList", {
                        key: "playlist",
                        value: res.data.playlist
                    })
                    let music = {
                        id: res.data.playlist[0].id,
                        limit: 12,
                        offset: 0,
                    }
                    getUserLikedMusics(music).then((res: USER_ACCOUNT) => {
                        const { data: { songs } } = res
                        commit('sendMusicNums', { key: "likeMusic", value: songs })
                    })
                    getPlayListDetail(music.id).then((res: USER_ACCOUNT) => {
                        const { data: { privileges,playlist } } = res
                        commit('sendMusicLiked', { key: "num", value: privileges.length })
                        // commit("sendMusicLiked", { key: "num", value: playlist.trackIds.length})
                    })
                }
            })
        }
    },
    getUserAccountByPhone: ({ state, commit }: any): void | Promise<any> => {
        if (isLoginedIn()) {

        }
    },

}