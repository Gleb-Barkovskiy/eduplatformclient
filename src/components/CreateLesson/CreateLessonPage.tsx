import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createLesson } from '../../store/lessons/actions/lessonsActions';
import { newLessonData } from '../../store/lessons/types/types';
import styles from './styles.module.scss';

enum newLessonFields {
    title = 'title',
    description = 'description',
    poster = 'poster',
    video = 'video',
    tags = 'tags',
};

const initialState:newLessonData = {
    title: '',
    description: '',
    poster: '',
    video: '',
    tags: '',
    authorName: '',
    authorId: '',
};


export const CreateLessonPage:React.FC = () => {

    const dispatch = useDispatch();

    const [lessonData, setLessonData] = useState(initialState);

    const user = useTypedSelector(state => state.auth.auth!.user);

    const loading = useTypedSelector(state => state.lessons.loading);

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void  => {
        e.preventDefault();
        dispatch(createLesson({
            ...lessonData, 
            authorId: user.id, 
            authorName: user.firstName + ' ' + user.lastName,
            video: linkToEmbed(lessonData.video)
        }));
    };

    const linkToEmbed = (link: string) => {
        return link.replace('watch?v=', 'embed/').split('&')[0];
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonData({ ...lessonData, [e.target.name]: e.target.value });
    };

    const clear = () => {
        setLessonData(initialState);
    };

    if(loading) {
        return <div className={styles.page}>Loading...</div>
    };

    return (
        <div className={styles.page}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Создать новый урок</h2>
            <input
                className={styles.input}
                placeholder="Название"
                onChange={handleChange}
                name={newLessonFields.title}
            />
             <input
                className={styles.input}
                placeholder="Описание"
                onChange={handleChange}
                name={newLessonFields.description}
            />
            <input
                className={styles.input}
                placeholder="Ссылка на постер"
                onChange={handleChange}
                name={newLessonFields.poster}
            />
            <input
                className={styles.input}
                placeholder="Ссылка на видео"
                onChange={handleChange}
                name={newLessonFields.video}
            />
             <input
                className={styles.input}
                placeholder="Теги"
                onChange={handleChange}
                name={newLessonFields.tags}
            />
            <div className={styles.buttons}>
            <button className={styles.submitButton} type="submit">
                Создать
            </button>
            <button className={styles.clearButton} onClick={clear}>
                Очистить
            </button>
            </div>
           </form>
        </div>
    );
};
