import { actionTypes } from "../actions/actionTypes";

export interface SignInData {
    email: string, 
    password: string,
};

export interface SignUpData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
};

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    subscribers: string;
};

export interface Auth {
    accessToken: string;
    refreshToken: string;
    user: User;
};

export type userSignInAction = signInSuccessAction | signInErrorAction | loadingAction;
export type userSignUpAction = signUpSuccessAction | signUpErrorAction | loadingAction;
export type userSignOutAction = signOutAction | loadingAction;

interface loadingAction {
    type: actionTypes.LOADING_AUTH,
}
interface signInSuccessAction {
    type: actionTypes.LOGIN_SUCCESS,
    payload: Auth,
};
interface signInErrorAction {
    type: actionTypes.LOGIN_ERROR,
    payload: string
};

interface signUpSuccessAction {
    type: actionTypes.REGISTRATION_SUCCESS,
    payload: Auth,
};
interface signUpErrorAction {
    type: actionTypes.REGISTRATION_ERROR,
    payload: string
};

interface signOutAction {
    type: actionTypes.LOGOUT,
};