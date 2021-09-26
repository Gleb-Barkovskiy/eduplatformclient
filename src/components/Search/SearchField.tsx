import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { searchLessons } from '../../store/lessons/actions/lessonsActions';

export const SearchField: React.FC = () => {

    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const tags = text.split(' ');
        dispatch(searchLessons(tags));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                className={styles.input}
                type="text"
                placeholder="Поиск"
                onChange={handleChange}
            />
            <button className={styles.button} type="submit">
                <SearchIcon/>
            </button>
        </form>
    );
};
