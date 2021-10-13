import { Auth, userSignInAction, userSignOutAction, userSignUpAction } from './../types/types';
import { actionTypes } from "../actions/actionTypes";

interface AuthState {
    isAuth: boolean,
    auth: Auth | null,
    loading: boolean,
    error: null | string,
};

const initialState:AuthState = {
    isAuth: false,
    auth: null,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action:userSignInAction | userSignUpAction | userSignOutAction):AuthState => {
    switch(action.type) {
        case actionTypes.LOADING_AUTH:
            return {isAuth: false, auth: null, loading: true, error: null};
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTRATION_SUCCESS:
            return {isAuth: true, auth: action.payload, loading: false,error: null};
        case actionTypes.LOGIN_ERROR:
        case actionTypes.REGISTRATION_ERROR:
            return {isAuth: false, auth: null, loading: false,error: action.payload};
        case actionTypes.LOGOUT:
            return {isAuth: false, auth: null, loading: false, error: null};
        default:
            return state;
    };
};