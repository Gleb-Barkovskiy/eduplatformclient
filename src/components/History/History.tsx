import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getLessons } from '../../store/lessons/actions/lessonsActions';
import { FetchingError } from '../Errors/FetchingError/FetchingError';
import { LessonItem } from '../Lessons/LessonsItem/LessonItem';
import { Loader } from '../Loading/Loader';
import styles from '../Lessons/Lessons/styles.module.scss';
export const History: React.FC = () => {
    const { lessons, loading, error } = useTypedSelector(
        (state) => state.lessons
    );

    const user = useTypedSelector(state => state.auth.auth?.user);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getLessons({field: "views", value: user!.id}));
    }, [dispatch, user]);
    
    if (loading) {
        return <div className="page"><Loader/></div>;
    }
    
    if (error) {
        return <FetchingError text={error}/>;
    }
      
    return (
        <div className="page">
            <h2>История</h2>
            <div className={styles.container}>
        {lessons.length > 0 ? lessons.map((lesson) => (
          <LessonItem key={lesson!._id} lesson={lesson} />
        )) : (
          <div>
            <h5>
              Тут пусто :(
            </h5>
          </div>
        )}
        </div>
        </div>
    );
};
