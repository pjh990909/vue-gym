import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state() {
        return {
            authUser: null,
            authTrainer: null,
            token: null
        };
    },
    mutations: {
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setAuthTrainer(state, payload){
            state.setAuthTrainer = payload;
        },
        setAuthName(state, payload) {
            state.authUser.name = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        }
    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]
});