import { actionTypes  } from '../actions/actionTypes';
import { lessonsAction, LessonObject } from '../types/types';


interface lessonsState {
    lessons: Array<LessonObject>,
    loading: boolean,
    error: null | string
};

const initialState:lessonsState = {
    lessons: [],
    loading: false,
    error: null,
};

export const lessonsReducer = (state = initialState, action:lessonsAction):lessonsState => {
    switch(action.type) {
        // LOADING
        case actionTypes.FETCH_ALL:
        case actionTypes.CREATE:
        case actionTypes.DELETE:
            return {lessons: state.lessons, loading: true, error: null};
        // SUCCESS
        case actionTypes.FETCH_ALL_SUCCESS:
            return {lessons: action.payload, loading: false, error: null};
        case actionTypes.CREATE_SUCCESS:
            state.lessons.push(action.payload);
            return {lessons: state.lessons, loading: false, error: null};
        case actionTypes.DELETE_SUCCESS:
            let pos = state.lessons.indexOf(action.payload);
            delete state.lessons[pos];
            return {lessons: state.lessons, loading: false, error: null};
        // ERROR
        case actionTypes.FETCH_ALL_ERROR:
        case actionTypes.CREATE_ERROR:
        case actionTypes.DELETE_ERROR:
            return {lessons: state.lessons, loading: false, error: action.payload};

        case actionTypes.SEARCH:
            console.log(action.payload)
            const result = state.lessons.filter(lesson => {
                for (let i = 0; i < action.payload.length; i++) {
                    console.log(action.payload[i] + ' in ' + lesson.tags)
                    if (lesson.tags.indexOf(action.payload[i]) !== -1) return true
                }
                return false
            });
            console.log(result)
            return {lessons: result, loading: false, error: null};
        default:
            return state;
    };
};