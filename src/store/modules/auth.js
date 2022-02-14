//@ts-check
import util from '../../utilities/util.js';

const state = initialAuthState();

const getters = {
    getName: state => state.UserName,
    getEmail: state => state.email,
    getMobileNumber: state => state.mobileNumber,
    getIsPaidUser: state => state.isPaidUser,
    getOTP: state => state.otp,
    getAnonymousResponse: state => state.anonymousResponse,
    getOptedForPayment: state => state.optedForPayment,
    getTriggerPayment: state => state.triggerPayment,
    getIsUserLoggedIn: state => state.isUserLoggedIn,
    getReferralToken: state => state.referralToken
};

const mutations = {
    updateEmail: (state, payload) => {
        state.email = payload;
    },
    updateMobileNumber: (state, payload) => {
        state.mobileNumber = payload;
    },
    updateOTP: (state, payload) => {
        state.otp = payload;
    },
    updateIsPaidUser: (state, payload) => {
        state.isPaidUser = payload;
    },
    updateName: (state, payload) => {
        state.UserName = payload;
    },
    updateUserID: (state, payload) => {
        state.UserID = payload;
    },
    updateAnonymousResponse: (state, payload) => {
        state.anonymousResponse = (payload);
    },
    updateOptedPayment: (state, payload) => {
        state.optedForPayment = (payload);
    },
    updateTriggerPayment: (state, payload) => {
        state.triggerPayment = (payload);
    },
    updateIsUserLoggedIn: (state, payload) => {
        state.isUserLoggedIn = (payload);
    },
    updateReferralToken: (state, payload) => {
        state.referralToken = payload;
    },
    resetAuth(state) {
        // acquire initial state
        const initial_state = initialAuthState();
        Object.keys(initial_state).forEach(key => {
            state[key] = initial_state[key];
        });
    }
};

const actions = {
    updateEmail: (context, payload) => {
        context.commit('updateEmail', payload);
    },
    updateMobileNumber: (context, payload) => {
        context.commit('updateMobileNumber', payload);
    },
    updateOTP: (context, payload) => {
        context.commit('updateOTP', payload);
    },
    updateName: (context, payload) => {
        context.commit('updateName', payload);
    },
    updateUserID: (context, payload) => {
        context.commit('updateUserID', payload);
    },
    updateIsPaidUser: (context, payload) => {
        context.commit('updateIsPaidUser', payload);
    },
    updateAnonymousResponse: (context, payload) => {
        context.commit('updateAnonymousResponse', payload);
    },
    updateOptedPayment: (context, payload) => {
        context.commit('updateOptedPayment', payload);
    },
    updateTriggerPayment: (context, payload) => {
        context.commit('updateTriggerPayment', payload);
    },
    updateIsUserLoggedIn: (context, payload) => {
        context.commit('updateIsUserLoggedIn', payload);
    },
    updateReferralToken: (context, payload) => {
        context.commit('updateReferralToken', payload);
    },
    resetAuth: (context) => {
        context.commit('resetAuth');
    },


};

export default {
    state,
    mutations,
    actions,
    getters
};

function initialAuthState() {
    return {
        email: '',
        mobileNumber: "",
        otp: "",
        isPaidUser: false,
        UserName: "",
        UserID: "",
        anonymousResponse: [],
        optedForPayment: false,
        triggerPayment: false,
        isUserLoggedIn: false,
        referralToken: ""
    };
}