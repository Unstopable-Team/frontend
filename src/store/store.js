import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex)

import APIclient from "../services/apiClient"
import constants from "../constants";

const store = new Vuex.Store({
    state: {
        userToken: null,
        userRefreshToken: null,
        errorMessage: null,
        successMessage: null,
    },
    mutations: {
        setUserToken (state, userToken) {
            // Maybe not the best implementation
            //add it to axios:
            APIclient.defaults.headers.post['Authorization'] = 'Bearer '+userToken
            state.userToken = userToken;
        },
        setUserRefreshToken (state, userRefreshToken) {
            // mutate state
            state.userRefreshToken = userRefreshToken;
        },
        setErrorMessage(state, errorMessage) {
            state.errorMessage = errorMessage;
        },
        setSuccessMessage(state, successMessage) {
            state.successMessage = successMessage;
        },

    },
    actions: {
        getNewData(context) {
            if(context.state.userToken!=null) {
                APIclient.post('/notifications', {})
                    .then(function (response) {
                        context.commit('setNotifications', response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                        context.commit('setErrorMessage',{
                        message: error
                    });
                    });
            }
        },
        loginUser(context, data) {
            //data.username
            //data.password
            APIclient.post('/login', {
                user_name: data.username,
                password: data.password
            })
                .then(function (response) {
                    console.log(response.data);
                    context.commit('setUserToken',response.data.access_token);
                    context.commit('setUserRefreshToken',response.data.refresh_token);
                })
                .catch(function (error) {
                    console.log(error);
                    context.commit('setErrorMessage',{
                        message: error
                    });
                });
        },
        logoutUser(context) {
            //data.username
            //data.password
            APIclient.post('/user/logout', {
            })
                .then(function (response) {
                    console.log(response.data.message);
                    context.commit('setSuccessMessage',response.data.message);
                })
                .catch(function (error) {
                    console.log(error);
                    context.commit('setErrorMessage',{
                        message: error
                    });
                });
        },
        refreshToken(context) {
            APIclient.post(constants.JWT_REFRESH_TOKEN_ENDPOINT, {
            })
                .then(function (response) {
                    context.commit('setUserToken',response.data.access_token);
                })
                .catch(function (error) {
                    console.log(error);
                    context.commit('setErrorMessage',error);
                });
        },
        createUser(context, data) {
            //data.user_name
            //data.email
            //data.password
            //data.name
            APIclient.post('/user', {
                user_name: data.user_name,
                email: data.email,
                password: data.password,
                name: data.name,
            })
                .then(function (response) {
                    console.log(response.data.message);
                    context.commit('setSuccessMessage',response.data.message);
                })
                .catch(function (error) {
                    console.log(error);
                    context.commit('setErrorMessage',{
                        message: error
                    });
                });
        },

    }
});

export default store;