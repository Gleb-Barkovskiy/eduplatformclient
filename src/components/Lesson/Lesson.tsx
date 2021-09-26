import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LESSONS_ROUTE } from '../../router/consts';
import { deleteLesson, getLesson, likeLesson } from '../../store/lessons/actions/lessonsActions';
import { FetchingError } from '../Errors/FetchingError/FetchingError';
import { UpdateLesson } from '../UpdateLesson/UpdateLesson';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.module.scss';

export const Lesson:React.FC = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const {lesson, loading, error} = useTypedSelector(state => state.lesson);
    const user = useTypedSelector(state => state.auth.auth?.user);

    useEffect(() => {
        if(localStorage.getItem('lesson') && !loading && !lesson) {
            dispatch(getLesson(localStorage.getItem('lesson')!, user?.id));
        };
    }, [dispatch, lesson, loading, user]);

    if (loading) {
        return <h4>Загрузка...</h4>;
    };
    if (error) {
        return <FetchingError text={error}/>;
    };

    const deleteThisLesson = () => {
        dispatch(deleteLesson(lesson!._id));
        alert('Урок успешно удален!');
    };

    const handleLike = () => {
       const lessonId = lesson!._id;
       const userId = user!.id;
       dispatch(likeLesson(lessonId, userId));
    };

    return lesson ? (
        <div className="page">
            <div className={styles.container}>
                <h1>{lesson.title}</h1>
                {lesson.video.indexOf('youtube') ? (
                    <iframe 
                        className={styles.video}
                        title="Video"
                        src={lesson.video}>
                    </iframe>
                ) : (
                    <video
                        className={styles.video}
                        title="Video"
                        src={lesson.video}
                        controls={true}
                    >
                    </video>
                )}
                <article className={styles.description}>
                    {lesson.description}
                </article>
                {user && (
                <div className={styles.toolbar}>
                    {lesson.likes.indexOf(user.id) !== -1 ? (
                        <button className={styles.btn} onClick={handleLike}>
                            <FavoriteIcon/>    
                        </button>
                    ) : (
                        <button className={styles.btn} onClick={handleLike}>
                            <FavoriteBorderIcon/>
                        </button>
                    )}
                    {user!.id === lesson.authorId && (
                        <div>
                            <NavLink to={LESSONS_ROUTE} onClick={deleteThisLesson}>
                                <button className={styles.btn}>
                                    <DeleteForeverIcon/>
                                </button>
                            </NavLink>
                            <button className={styles.btn} onClick={() => setModalOpen(!isModalOpen)}>
                                <SettingsIcon/>
                            </button>
                            {isModalOpen && (<div className={styles.modal}>
                                <button className={styles.close} onClick={() => setModalOpen(false)}>
                                    <CloseIcon/>
                                </button>
                            <UpdateLesson 
                            id={lesson._id}
                            title={lesson.title} 
                            description={lesson.description} 
                            poster={lesson.poster}
                            />
                            </div>)}
                        </div>
                    )}
                </div>)}
            </div>
        </div>
    ) : (
        <div className="page">
            <h2>Урок не найден</h2>
        </div>
    );
};
