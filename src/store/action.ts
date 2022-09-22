import { isLoginedIn, isAccountLoginedin } from "../utils/cookie"
import { getUserAccount, getUserDetail } from "../api/account/userAccount"
import {
    getUserLiked,
    getUserPlayList,
    getUserLikedMusics,
    getPlayListDetail,
    getMusicDeatil
} from "../api/music/music"
import { getMvDetailById, getVideoDetailById, getVideoDetailUrlById, getMvDetailUrlById } from "../api/mv/mv"
import { VuexTypes } from "./types/index"

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
    getUserAccountProfile: ({ state, commit }: { [key: string]: any }): void | Promise<any> => {
        if (isLoginedIn()) {
            // get user detail
            return getUserDetail<string>(state.data.userData.account.id).then((res: VuexTypes) => {
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
    getUserLikePlayList: ({ state, commit }: { [key: string]: any }): void | Promise<any> => {
        if (isLoginedIn()) {
            let params = {
                uid: state.data.userData.account.id,
                limit: 2000,
                offset: 0,
                timesamp: new Date().getTime()
            }
            return getUserPlayList<{
                [key: string]: string | number
            }>(params).then(async (res: VuexTypes) => {
                // submit playlist
                if (res.data.code === 200) {
                    commit("updateUserPlayList", {
                        key: "playlist",
                        value: res.data.playlist
                    })
                    commit('updatePLayIntro', { key: "intro", value: res.data })
                    let music = {
                        id: res.data.playlist[0].id,
                        limit: 12,
                        offset: 0,
                    }
                    getUserLikedMusics<{
                        [key: string]: string | number
                    }>(music).then((res: VuexTypes) => {
                        const { data: { songs } } = res
                        commit('sendMusicNums', { key: "likeMusic", value: songs })
                    })
                    getPlayListDetail(music.id).then((res: VuexTypes) => {
                        const { data: { privileges } } = res
                        commit('sendMusicLiked', { key: "num", value: privileges.length })
                        // commit("sendMusicLiked", { key: "num", value: playlist.trackIds.length})
                    })
                }
            })
        }
    },
    getVideosDetail: ({ state, commit }: { [key: string]: any }): void | Promise<any> => {
        const id = state.data.mvid
        let reg = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i
        if (reg.test(id)) {
            return getMvDetailUrlById<string>(id).then((result: VuexTypes) => {
                const { data: { data } } = result
                commit("sendVideoDetail", { key: "vd", value: [data] })
            })
        } else {
            return getVideoDetailUrlById<string>(id).then((result: VuexTypes) => {
                const { data: { urls } } = result
                commit("sendVideoDetail", { key: "vd", value: urls })
            })
        }
    },
    getMvsDeatilToPlay: ({ state, commit }: { [key: string]: any }): void | Promise<any> => {
        const id = state.data.mvid
        // 判断是mv还是视频
        let reg = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i
        if (reg.test(id)) {
            return getMvDetailById<string>(id).then((res: VuexTypes) => {
                const { data: { data } } = res
                commit("sendMvsDetail", { key: "md", value: data })
            })
        } else {
            return getVideoDetailById<string>(id).then((res: VuexTypes) => {
                const { data: { data } } = res
                commit("sendMvsDetail", { key: "md", value: data })
            })
        }
    },
    updatePlayMusicList: ({ state, commit }: { [key: string]: any }): void | Promise<any> => {
        const pid = state.play.playInfo.id
        const data = state.play.num
        const params = {
            id: pid,
            limit: data.limit,
            offset: data.offset,
        }
        return getUserLikedMusics<{ [key: string]: string | number }>(params).then((res: VuexTypes) => {
            const { data: { songs } } = res
            commit("updatePlayMusicLists", { key: "songs", value: songs })
        })
    }

}