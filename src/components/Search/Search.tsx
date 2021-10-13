import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getLessons } from '../../store/lessons/actions/lessonsActions';
import { Error } from '../Errors/Error';
import { LessonItem } from '../LessonsItem/LessonsItem';
import { Loader } from '../Loading/Loader';
import styles from '../Lessons/styles.module.scss';

export const Search: React.FC = () => {
    const { loading, error, searchTags } = useTypedSelector(state => state.lessons);
    let {lessons} = useTypedSelector(state => state.lessons);
    
      const dispatch = useDispatch();
    
      useEffect(() => {
        dispatch(getLessons());
      }, [dispatch]);

      if (lessons && searchTags) {
          const tags = new Set(searchTags);
          console.log(searchTags);
          lessons = lessons.filter(lesson => {
              return lesson.tags.map(tag => {
                if (tags.has(tag)) {
                    return true;
                } else {
                    return false;
                }
              });
          });
      }
    
      if (loading) {
        return <div className={styles.page}><Loader/></div>;
      }
    
      if (error) {
        return <Error text={error}/>;
      }
    
    return (
        <div className={styles.page}>
            <h2>Результаты поиска</h2>
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
    );
};
