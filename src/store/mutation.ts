import { UPDATE_DATA, STATE } from "./types/index"
export default {
    // userinfo
    updateData(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 账户登录
    updateDataByAccount(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 详情
    sendDetailTostore(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 用户详情
    getUserDetailInfo(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // playlist
    updateUserPlayList(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    //  手机登录
    sendUserIdByPhone(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 喜欢音乐数目
    sendMusicNums(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 喜欢音乐
    sendMusicLiked(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // mvid
    sendMvsId(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // MV详情
    sendMvsDetail(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 视频详情
    sendVideoDetail(state: STATE, data: UPDATE_DATA) {
        state.mv[data.key] = data.value
    },
    // 歌单歌曲
    sendPlayDetailMusic(state: STATE, data: UPDATE_DATA) {
        state.play[data.key] = data.value
    },
    // 歌单详情
    updatePLayIntro(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // 歌曲
    updatePlayMusicLists(state: STATE, data: UPDATE_DATA){
        state.play[data.key] = data.value
    },
    // 懒加载数目
    sendMusicNumber(state: STATE, data: UPDATE_DATA){
        state.play[data.key] = data.value
    },
    // 歌曲详情
    sendMusicUrlDetail(state: STATE, data: UPDATE_DATA){
        state.play[data.key] = data.value
    },
    sendMusicUrl(state: STATE, data: UPDATE_DATA) {
        state.play[data.key] = data.value
    },
    sendPlayMusic(state: STATE, data: UPDATE_DATA) {
        state.play[data.key] = data.value
    },
    sendPlayMusicCurrentTime(state: STATE, data: UPDATE_DATA) {
        state.play[data.key] = data.value
    },
    lyricsState(state: STATE, data: UPDATE_DATA) {
        state.play[data.key] = data.value
    }
}