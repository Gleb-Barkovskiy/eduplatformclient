import React from 'react';
// consts
import { AUTH_ROUTE, CREATE_ROUTE, LESSON_DETAILS_ROUTE, LESSONS_ROUTE, PROFILE_ROUTE, HISTORY_ROUTE, FAVORITES_ROUTE } from './consts';
// components
import {Lessons} from '../components/Lessons/Lessons';
import {Lesson} from '../components/Lesson/Lesson';
import {Auth} from '../components/Auth/Auth';
import {Profile} from '../components/Profile/Profile';
import {CreateLessonPage} from '../components/CreateLesson/CreateLessonPage';
import { Favorite } from '../components/Favorite/Favorite';
import { History } from '../components/History/History';


interface RouteType {
    path: string,
    component: React.FC
};


export const publicRoutes:Array<RouteType> = [
    {
        path: LESSONS_ROUTE,
        component: Lessons,
    },
    {
        path: LESSON_DETAILS_ROUTE,
        component: Lesson
    },
    {
        path: AUTH_ROUTE,
        component: Auth
    },
];

export const privateRoutes:Array<RouteType> = [
    {
        path: LESSONS_ROUTE,
        component: Lessons
    },
    {
        path: LESSON_DETAILS_ROUTE,
        component: Lesson
    },
    {
        path: FAVORITES_ROUTE,
        component: Favorite
    },
    {
        path: HISTORY_ROUTE,
        component: History
    },
    {
        path: PROFILE_ROUTE,
        component: Profile
    },
    {
        path: CREATE_ROUTE,
        component: CreateLessonPage
    },
];