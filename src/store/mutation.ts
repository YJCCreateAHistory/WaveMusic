import { UPDATE_DATA, STATE } from "./types/index"
export default {
    // userinfo
    updateData(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    updateDataByAccount(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    sendDetailTostore(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    getUserDetailInfo(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    // playlist
    updateUserPlayList(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    sendUserIdByPhone(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    sendMusicNums(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    },
    sendMusicLiked(state: STATE, data: UPDATE_DATA) {
        state.data[data.key] = data.value
    }
}