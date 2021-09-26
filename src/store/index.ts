import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import { lessonsReducer } from './lessons/reducer/lessonsReducer';
import { lessonReducer } from './lessons/reducer/lessonReducer';
import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer/authReducer";


const rootReducer = combineReducers({
    lessons: lessonsReducer,
    lesson: lessonReducer,
    auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk));
