import { userSignInAction, userSignOutAction, SignInData, SignUpData, userSignUpAction } from './../types/types';
import { Dispatch } from "redux";
import { actionTypes } from "./actionTypes";
import * as api from '../../api/index';
import axios from 'axios';


export const signInUser = (userData: SignInData) => async (dispatch: Dispatch<userSignInAction>) => {
    try {
        const {data} = await api.signInUser(userData);
        localStorage.setItem('token', data.accessToken);
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.LOGIN_ERROR, payload: e});
    };
};

export const signUpUser = (userData: SignUpData) => async (dispatch: Dispatch<userSignUpAction>) => {
    try {
        const {data} = await api.signUpUser(userData);
        localStorage.setItem('token', data.accessToken);
        dispatch({ type: actionTypes.REGISTRATION_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.REGISTRATION_ERROR, payload: e});
    };
};

export const singOutUser = () => async (dispatch: Dispatch<userSignOutAction>) => {
    try {
        await api.signOutUser();
        localStorage.removeItem('token');
        dispatch({ type: actionTypes.LOGOUT});
    } catch (e) {
        console.log(e);
    };
};

export const checkAuth = () => async (dispatch: Dispatch<userSignInAction>) => {
    try {
        const res = await axios.get('http://localhost:8080/auth/refresh', {withCredentials: true});
        localStorage.setItem('token', res.data.accessToken);
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data});
    } catch(e) {
        dispatch({ type: actionTypes.LOGIN_ERROR, payload: e});
    };
};