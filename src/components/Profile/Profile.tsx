import React, { useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LessonItem } from '../Lessons/LessonsItem/LessonItem';
import styles from '../Lessons/Lessons/styles.module.scss';
import { useDispatch } from 'react-redux';
import { getLessons } from '../../store/lessons/actions/lessonsActions';
import { FetchingError } from '../Errors/FetchingError/FetchingError';
import { Loader } from '../Loading/Loader';

export const Profile: React.FC = () => {

    const user = useTypedSelector(state => state.auth.auth!.user);

    const { lessons, loading, error } = useTypedSelector(
        (state) => state.lessons
      );
    
      const dispatch = useDispatch();
    
      useEffect(() => {
        dispatch(getLessons({field: "authorId", value: user!.id}));
      }, [dispatch, user]);
    
      if (loading) {
        return <div className="page"><Loader/></div>;
      }
    
      if (error) {
        return <FetchingError text={error}/>;
      }

    return (
        <div className="page">
            <h2>{user.firstName + ' ' + user.lastName + ': ' + user.email}</h2>
            <div className={styles.container}>
            {lessons.length > 0 ? lessons.map((lesson) => (
                <LessonItem key={lesson._id} lesson={lesson} />
            )) : (
            <div>
                <h5>
                Тут пусто :(
                </h5>
            </div>
        )}
        </div>
        </div>
    )
};