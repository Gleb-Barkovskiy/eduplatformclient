import React, { useEffect } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Error } from '../Errors/Error';
import { LessonItem } from '../LessonsItem/LessonsItem';
import { Loader } from '../Loading/Loader';
import styles from '../Lessons/styles.module.scss';
import { useDispatch } from 'react-redux';
import { getLessons } from '../../store/lessons/actions/lessonsActions';

export const Favorite: React.FC = () => {

    const { lessons, loading, error } = useTypedSelector(
        (state) => state.lessons
    );

    const user = useTypedSelector(state => state.auth.auth?.user);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getLessons({field: "likes", value: user!.id}));
    }, [dispatch, user]);
    
    if (loading) {
        return <div className={styles.page}><Loader/></div>;
    }
    
    if (error) {
        return <Error text={error}/>;
    }
      
    return (
        <div className={styles.page}>
            <h2>Понравилось</h2>
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
