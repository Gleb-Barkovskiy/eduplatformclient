import { Auth, userSignInAction, userSignOutAction, userSignUpAction } from './../types/types';
import { actionTypes } from "../actions/actionTypes";

interface AuthState {
    isAuth: boolean,
    auth: Auth | null,
    error: null | string,
};

const initialState:AuthState = {
    isAuth: false,
    auth: null,
    error: null,
};

export const authReducer = (state = initialState, action:userSignInAction | userSignUpAction | userSignOutAction):AuthState => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTRATION_SUCCESS:
            return {isAuth: true, auth: action.payload, error: null};
        case actionTypes.LOGIN_ERROR:
        case actionTypes.REGISTRATION_ERROR:
            return {isAuth: false, auth: null, error: action.payload};
        case actionTypes.LOGOUT:
            return {isAuth: false, auth: null, error: null};
        default:
            return state;
    };
};