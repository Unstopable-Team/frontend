import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex)

import APIclient from "../services/apiClient"
import constants from "../constants";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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
        dispatchErrorMessage(context, data) {
            context.commit('setErrorMessage',data);
            window.setTimeout(function() {
                console.log("remove message")
                context.commit('setErrorMessage',null);
            }, 2500);
        },
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
            if(data.username.length<3) {
                context.commit('setErrorMessage',{
                    message: "You must provide an username"
                });
            } else if(data.password<3) {
                context.dispatch('dispatchErrorMessage',{
                    message: "You must provide a password"
                });
            } else {
                if(!constants.DEMO) {
                    APIclient.post('/login', {
                        user_name: data.username,
                        password: data.password
                    })
                        .then(function (response) {
                            console.log(response.data);
                            context.commit('setUserToken', response.data.access_token);
                            context.commit('setUserRefreshToken', response.data.refresh_token);
                        })
                        .catch(function (error) {
                            console.log(error);
                            context.dispatch('dispatchErrorMessage', {
                                message: error
                            });
                        });
                }else {
                    context.commit('setUserToken',"token");
                    context.commit('setUserRefreshToken', "refresh_token");
                }
            }
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
                    context.dispatch('dispatchErrorMessage',{
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
                    context.dispatch('dispatchErrorMessage',error);
                });
        },
        createUser(context, data) {
            //data.user_name
            //data.email
            //data.password
            //data.name
            if(data.user_name.length<3) {
                context.dispatch('dispatchErrorMessage',{
                    message: "You must provide an username"
                });
            } else if(data.password<3) {
                context.dispatch('dispatchErrorMessage',{
                    message: "You must provide a password"
                });
            } else if(validateEmail(data.email)==false) {
                context.dispatch('dispatchErrorMessage',{
                    message: "You must provide a valid e-mail"
                });
            } else if(data.name<3) {
                context.dispatch('dispatchErrorMessage',{
                    message: "You must provide a name"
                });
            } else {
                if(!constants.DEMO) {
                    APIclient.post('/user', {
                        user_name: data.user_name,
                        email: data.email,
                        password: data.password,
                        name: data.name,
                    })
                        .then(function (response) {
                            console.log(response.data.message);
                            context.commit('setSuccessMessage', response.data.message);
                        })
                        .catch(function (error) {
                            console.log(error);
                            context.dispatch('dispatchErrorMessage', {
                                message: error
                            });
                        });
                } else {
                    context.commit('setUserToken',"token");
                    context.commit('setUserRefreshToken', "refresh_token");
                }
            }
        },

    }
});

export default store;