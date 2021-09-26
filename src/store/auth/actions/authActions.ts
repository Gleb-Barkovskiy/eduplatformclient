import { userSignInAction, userSignOutAction, SignInData, SignUpData, userSignUpAction } from './../types/types';
import { Dispatch } from "redux";
import { actionTypes } from "./actionTypes";
import * as api from '../../api/index';
import axios from 'axios';


export const signInUser = (userData: SignInData) => async (dispatch: Dispatch<userSignInAction>) => {
    try {
        const {data} = await api.signInUser(userData);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.LOGIN_ERROR, payload: e});
    };
};

export const signUpUser = (userData: SignUpData) => async (dispatch: Dispatch<userSignUpAction>) => {
    try {
        const {data} = await api.signUpUser(userData);
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        dispatch({ type: actionTypes.REGISTRATION_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.REGISTRATION_ERROR, payload: e});
    };
};

export const singOutUser = () => async (dispatch: Dispatch<userSignOutAction>) => {
    try {
        await api.signOutUser();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch({ type: actionTypes.LOGOUT});
    } catch (e) {
        console.log(e);
    };
};

export const checkAuth = () => async (dispatch: Dispatch<userSignInAction>) => {
    try {
        const token = localStorage.getItem('refreshToken');
        const res = await axios.get(`https://pure-woodland-99054.herokuapp.com/auth/refresh/${token}`, {withCredentials: true});
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data});
    } catch(e) {
        dispatch({ type: actionTypes.LOGIN_ERROR, payload: e});
    };
};