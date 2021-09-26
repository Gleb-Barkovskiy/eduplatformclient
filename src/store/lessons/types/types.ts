import { actionTypes } from "../actions/actionTypes";

export interface Filter {
    field: string;
    value: string;
};

export interface LessonObject {
    _id: string,
    title: string,
    description: string,
    poster: string,
    video: string,
    tags: Array<string>,
    views: Array<string>,
    likes: Array<string>,
    authorName: string,
    authorId: string,
    createdAt: string,
};

export interface newLessonData {
    title: string;
    description: string;
    poster: string;
    video: string;
    tags: string;
    authorName: string;
    authorId: string;
};

export interface updateLessonData {
    title: string;
    description: string;
    poster: string;
};

export type lessonsAction = 
fetchLessonsAction | fetchLessonsSuccesAction | fetchLessonsErrorAction |
fetchLessonAction | fetchLessonSuccesAction | fetchLessonErrorAction |
createLessonAction | createLessonSuccesAction | createLessonErrorAction |
deleteLessonAction | deleteLessonSuccesAction | deleteLessonErrorAction |
updateLessonAction | updateLessonSuccesAction | updateLessonErrorAction |
likeLessonAction | searchLessons;

interface fetchLessonsAction {
    type: actionTypes.FETCH_ALL,
};
interface fetchLessonsSuccesAction {
    type: actionTypes.FETCH_ALL_SUCCESS,
    payload: [LessonObject]
};
interface fetchLessonsErrorAction {
    type: actionTypes.FETCH_ALL_ERROR,
    payload: string
};


interface fetchLessonAction {
    type: actionTypes.FETCH_ONE,
};
interface fetchLessonSuccesAction {
    type: actionTypes.FETCH_ONE_SUCCESS,
    payload: LessonObject
};
interface fetchLessonErrorAction {
    type: actionTypes.FETCH_ONE_ERROR,
    payload: string
};


interface createLessonAction {
    type: actionTypes.CREATE,
};
interface createLessonSuccesAction {
    type: actionTypes.CREATE_SUCCESS,
    payload: LessonObject
};
interface createLessonErrorAction {
    type: actionTypes.CREATE_ERROR,
    payload: string
};


interface deleteLessonAction {
    type: actionTypes.DELETE,
};
interface deleteLessonSuccesAction {
    type: actionTypes.DELETE_SUCCESS,
    payload: LessonObject
};
interface deleteLessonErrorAction {
    type: actionTypes.DELETE_ERROR,
    payload: string
};

interface updateLessonAction {
    type: actionTypes.UPDATE,
};
interface updateLessonSuccesAction {
    type: actionTypes.UPDATE_SUCCESS,
    payload: LessonObject
};
interface updateLessonErrorAction {
    type: actionTypes.UPDATE_ERROR,
    payload: string
};

interface likeLessonAction {
    type: actionTypes.LIKE,
    payload: LessonObject
};

interface searchLessons {
    type: actionTypes.SEARCH,
    payload: string[]
}