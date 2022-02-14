import Vue from 'vue';
import Vuex from 'vuex';
import questions from './modules/questions.js';
import auth from './modules/auth.js';
import dashboard from './modules/dashboard.js';


Vue.use(Vuex);
export const store = new Vuex.Store({
    strict: false,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        questions,
        auth,
        dashboard
    },
    //plugins: [vuexLocal.plugin]
});
