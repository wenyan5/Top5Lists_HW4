import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGGED_OUT: "LOGGED_OUT",
    LOGGED_IN: "LOGGED_IN",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });
    const history = useHistory();

    useEffect(() => {
        // if(auth.loggedIn == true)
            auth.getLoggedIn();
    }, []);  

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGGED_OUT: {
                return setAuth({
                    loggedIn: false
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        const response = await api.registerUser(userData); 
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            //store.loadIdNamePairs();
            store.loadIdNamePairs(response.data.user.email);
            return true;
        }else{
            return false;
        }
    }

    auth.loginUser = async function(userData, store) {
        const response = await api.loginUser(userData); 
        if (response.status === 200) { 
            authReducer({
                type: AuthActionType.LOGGED_IN,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
            //store.loadIdNamePairs();
            console.log("login user:", response.data.user.email);
            store.loadIdNamePairs(response.data.user.email);
            
            return true;
        }else{
            return false;
        }
    }

    auth.logoutUser = async function(){
        authReducer({
            type: AuthActionType.LOGGED_OUT,
        })
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };