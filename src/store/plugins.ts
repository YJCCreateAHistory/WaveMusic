import createPersistedState from "vuex-persistedstate"
export default {
    plugins:[
        createPersistedState({
            storage:window.sessionStorage
        })
    ]
}