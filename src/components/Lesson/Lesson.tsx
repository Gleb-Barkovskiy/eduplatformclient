import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LESSONS_ROUTE } from '../../router/consts';
import { deleteLesson, getLesson, likeLesson } from '../../store/lessons/actions/lessonsActions';
import { Error } from '../Errors/Error';
import { UpdateLesson } from '../UpdateLesson/UpdateLesson';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles.module.scss';
import { Loader } from '../Loading/Loader';

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
        return <div className={styles.page}><Loader/></div>;
    };
    if (error) {
        return <Error text={error}/>;
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
        <div className={styles.page}>
            <div className={styles.container}>
                {lesson.video.indexOf('youtube' || 'google') !== -1 ? (
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
                <h1>{lesson.title}</h1>
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
                        <div className={styles.user}>
                            <NavLink to={LESSONS_ROUTE} onClick={deleteThisLesson}>
                                <button className={styles.btn}>
                                    <DeleteForeverIcon/>
                                </button>
                            </NavLink>
                            <button className={styles.btn} onClick={() => setModalOpen(true)}>
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
                            setModalOpen={setModalOpen}
                            />
                            </div>)}
                        </div>
                    )}
                </div>)}
            </div>
        </div>
    ) : (
        <div className={styles.page}>
            <h2>Урок не найден</h2>
        </div>
    );
};
