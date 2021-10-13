import { Dispatch } from 'redux';
import * as api from '../../api/index';
import { lessonsAction } from '../types/types';
import {actionTypes} from './actionTypes';
import { newLessonData, updateLessonData, Filter } from './../types/types';

export const getLessons = (filter?:Filter) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({ type: actionTypes.FETCH_ALL });
        if(filter) {
            filter.field += '/';
        };
        const {data} = await api.getLessons(filter);
        dispatch({ type: actionTypes.FETCH_ALL_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.FETCH_ALL_ERROR, payload: 'Уроки не загружены, проверьте подключение к интернету'});
    };
};

export const getLesson = (id: string, value?:string) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({ type: actionTypes.FETCH_ONE });
        if(value) {
            value = '/' + value;
        };
        const {data} = await api.getLesson(id, value);
        localStorage.setItem('lesson', data._id);
        dispatch({ type: actionTypes.FETCH_ONE_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.FETCH_ONE_ERROR, payload: 'Урок не загружен, проверьте подключение к интернету'});
    };
};

export const createLesson = (lesson: newLessonData) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({ type: actionTypes.CREATE });
        const {data} = await api.createLesson(lesson);
        dispatch({ type: actionTypes.CREATE_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.CREATE_ERROR, payload: 'Урок не создан'});
    };
};

export const updateLesson = (id: string, updatedData: updateLessonData) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({ type: actionTypes.UPDATE });
        const {data} = await api.updateLesson(id, updatedData);
        dispatch({ type: actionTypes.UPDATE_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.UPDATE_ERROR, payload: 'Урок не обновлен'});
    };
};

export const likeLesson = (lessonId: string, userId: string) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        const {data} = await api.likeLesson(lessonId, {userId});
        dispatch({ type: actionTypes.LIKE, payload: data});
    } catch (e) {
        console.log(e);
    };
};


export const deleteLesson = (id: string) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({ type: actionTypes.DELETE });
        const {data} = await api.deleteLesson(id);
        dispatch({ type: actionTypes.DELETE_SUCCESS, payload: data});
    } catch (e) {
        dispatch({ type: actionTypes.DELETE_ERROR, payload: 'Урок не удален'});
    };
};

export const searchLessons = (tags: Array<string>) => async (dispatch: Dispatch<lessonsAction>) => {
    try {
        dispatch({type: actionTypes.SEARCH, payload: tags});
    } catch (e) {
        dispatch({ type: actionTypes.FETCH_ALL_ERROR, payload: 'Уроки не загружены, проверьте подключение к интернету'});
    }
}
