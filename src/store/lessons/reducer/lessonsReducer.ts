import { actionTypes  } from '../actions/actionTypes';
import { lessonsAction, LessonObject } from '../types/types';


interface lessonsState {
    lessons: Array<LessonObject>,
    loading: boolean,
    searchTags: null | Array<string>,
    error: null | string
};

const initialState:lessonsState = {
    lessons: [],
    searchTags: null,
    loading: false,
    error: null,
};

export const lessonsReducer = (state = initialState, action:lessonsAction):lessonsState => {
    switch(action.type) {
        // LOADING
        case actionTypes.FETCH_ALL:
        case actionTypes.CREATE:
        case actionTypes.DELETE:
            return {lessons: state.lessons, searchTags: null, loading: true, error: null};
        // SUCCESS
        case actionTypes.FETCH_ALL_SUCCESS:
            return {lessons: action.payload, searchTags: null, loading: false, error: null};
        case actionTypes.CREATE_SUCCESS:
            state.lessons.push(action.payload);
            return {lessons: state.lessons, searchTags: null, loading: false, error: null};
        case actionTypes.DELETE_SUCCESS:
            let pos = state.lessons.indexOf(action.payload);
            delete state.lessons[pos];
            return {lessons: state.lessons, searchTags: null, loading: false, error: null};
        // ERROR
        case actionTypes.FETCH_ALL_ERROR:
        case actionTypes.CREATE_ERROR:
        case actionTypes.DELETE_ERROR:
            return {lessons: state.lessons, searchTags: null, loading: false, error: action.payload};

        case actionTypes.SEARCH:
            return {lessons: state.lessons, searchTags: action.payload, loading: false, error: null};
        default:
            return state;
    };
};