import React from 'react';
import { LessonObject } from "../../store/lessons/types/types";
import { useDispatch } from 'react-redux';
import { getLesson } from '../../store/lessons/actions/lessonsActions';
import { NavLink } from 'react-router-dom';
import { LESSON_DETAILS_ROUTE } from '../../router/consts';
import styles from './styles.module.scss';
import moment from 'moment';
import { useTypedSelector } from '../../hooks/useTypedSelector';


export const LessonItem:React.FC<{lesson: LessonObject}> = ({lesson}) => {

    const dispatch = useDispatch();

    const user = useTypedSelector(state => state.auth.auth?.user);

    const openLessonDetails = () => {
        dispatch(getLesson(lesson._id, user?.id));
    };

    return (
            <div className={styles.wrapper}>
                <NavLink to={LESSON_DETAILS_ROUTE} onClick={openLessonDetails}>
                <div className={styles.poster}>
                    {lesson.poster.startsWith("http") ? 
                    <img src={lesson.poster} alt="lesson_image"/>  :
                    <img src="https://images.unsplash.com/photo-1614292253351-4deb4913c142?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="lesson_image"/>
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.tags}>
                        {lesson.tags.map(tag => (
                            <div key={tag} className={styles.tag}>
                                {tag}
                            </div>
                        ))}
                    </div>
                    <div className={styles.title}>
                        {lesson.title}
                    </div>
                    <div className={styles.creator}>
                        {lesson.authorName}
                    </div>
                    <div className={styles.date}>
                        {moment(lesson.createdAt).fromNow()}
                    </div>
                </div>
                </NavLink>
            </div>
    );
};