import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getLessons } from "../../store/lessons/actions/lessonsActions";
import { Error } from "../Errors/Error";
import { Loader } from "../Loading/Loader";
import { LessonItem } from "../LessonsItem/LessonsItem";
import styles from './styles.module.scss';
import { SearchField } from "../Search/SearchField";

export const Lessons: React.FC = () => {

  const { lessons, loading, error } = useTypedSelector(
    (state) => state.lessons
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.page}><Loader/></div>;
  }

  if (error) {
    return <Error text={error}/>;
  }

  return (
      <div className={styles.page}>
        <h2 onClick={() => {dispatch(getLessons())}}>Главная</h2>
        <div className={styles.search}>
            <SearchField/>
        </div>
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
