import { actionTypes } from "../actions/actionTypes";
import { lessonsAction, LessonObject } from "../types/types";

interface lessonState {
    lesson: LessonObject | null,
    loading: boolean,
    error: null | string
};

const initialState:lessonState = {
    lesson: null,
    loading: false,
    error: null,
};

export const lessonReducer = (state = initialState, action:lessonsAction):lessonState => {
    switch(action.type) {
        case actionTypes.FETCH_ONE:
        case actionTypes.UPDATE:
            return {lesson: null, loading: true, error: null};
        case actionTypes.FETCH_ONE_SUCCESS:
        case actionTypes.UPDATE_SUCCESS:
        case actionTypes.LIKE:
            return {lesson: action.payload, loading: false, error: null};
        case actionTypes.FETCH_ONE_ERROR:
        case actionTypes.UPDATE_ERROR:
            return {lesson: null, loading: false, error: action.payload};
        default:
            return state;
    };
};