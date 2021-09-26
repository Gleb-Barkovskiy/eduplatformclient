import WarningIcon from '@material-ui/icons/Warning';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getLessons } from "../../../store/lessons/actions/lessonsActions";
import { FetchingError } from "../../Errors/FetchingError/FetchingError";
import { Loader } from "../../Loading/Loader";
import { LessonItem } from "../LessonsItem/LessonItem";
import styles from './styles.module.scss';

export const Lessons: React.FC = () => {

  const { lessons, loading, error } = useTypedSelector(
    (state) => state.lessons
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  if (loading) {
    return <div className="page"><Loader/></div>;
  }

  if (error) {
    return <FetchingError text={error}/>;
  }

  return (
      <div className="page">
        <h2>Главная</h2>
        <div className={styles.container}>
        {lessons.length > 0 ? lessons.map((lesson) => (
          <LessonItem key={lesson._id} lesson={lesson} />
        )) : (
          <div>
            <WarningIcon/>
            <h5>
              Тут пусто :(
            </h5>
          </div>
        )}
        </div>
      </div>
  );
};
