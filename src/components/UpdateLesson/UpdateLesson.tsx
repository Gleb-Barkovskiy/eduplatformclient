import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLesson } from '../../store/lessons/actions/lessonsActions';
import styles from './styles.module.scss';

enum newLessonFields {
    title = 'title',
    description = 'description',
    poster = 'poster',
};


export const UpdateLesson: React.FC<{id: string, title: string, description: string, poster: string}> = ({
    id,
    title, 
    description, 
    poster}
) => {

    const dispatch = useDispatch();

    const [lessonData, setLessonData] = useState({title, description, poster});

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateLesson(id, lessonData));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLessonData({ ...lessonData, [e.target.name]: e.target.value });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Изменить</h3>
            <input
                className={styles.input}
                placeholder="Название"
                onChange={handleChange}
                name={newLessonFields.title}
                defaultValue={title}
            />
             <input
                className={styles.input}
                placeholder="Описание"
                onChange={handleChange}
                name={newLessonFields.description}
                defaultValue={description}
            />
            <input
                className={styles.input}
                placeholder="Ссылка на постер"
                onChange={handleChange}
                name={newLessonFields.poster}
                defaultValue={poster}
            />
            <button className={styles.button} type="submit">
                Готово
            </button>
        </form>
    );
};