import axios from 'axios';
import { SignInData, SignUpData } from './../auth/types/types';
import { newLessonData, updateLessonData, Filter } from './../lessons/types/types';

const API = axios.create({ withCredentials: true,baseURL: 'http://localhost:8080/' });

API.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

API.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalReq = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        try {
            const token = localStorage.getItem('refreshToken');
            const res = await axios.get(`http://localhost:8080/auth/refresh/${token}`, { withCredentials: true});
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            return API.request(originalReq);
        } catch (e) {
            return 'Пользователь не авторизован';
        };
    };
    throw error;
});

// lessons
export const getLessons = (filter?: Filter) => API.get(`api/lessons/${filter?.field || ''}${filter?.value || ''}`);

//lesson
export const getLesson = (id: string, userId?: string) => API.get(`api/lesson/${id}${userId || ''}`);
export const deleteLesson = (id: string) => API.delete(`api/lesson/${id}`);
export const createLesson = (lesson: newLessonData) => API.post(`api/lesson/create`, lesson);
export const updateLesson = (id: string, updatedData: updateLessonData) => API.put(`api/lesson/update/${id}`, updatedData);
export const likeLesson = (id: string, user: object) => API.put(`api/lesson/like/${id}`, user);


// auth
export const signUpUser = (userData: SignUpData) => API.post(`/auth/signup`, userData);
export const signInUser = (userData: SignInData) => API.post(`/auth/signin`, userData);
export const signOutUser = () => API.post(`/auth/signout`);