import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { getLessons } from '../../store/lessons/actions/lessonsActions';

export const SearchField: React.FC = () => {

    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.length) {
            dispatch(getLessons({field: "tags", value: text}));
        } else {
            dispatch(getLessons());
        };
    };

    return (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input 
                className={styles.input}
                placeholder="Поиск"
                onChange={handleChange}
            />
            <button className={styles.button} type="submit">
                <SearchIcon/>
            </button>
        </form>
    );
};
