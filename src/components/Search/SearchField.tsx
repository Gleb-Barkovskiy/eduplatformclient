import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { searchLessons } from '../../store/lessons/actions/lessonsActions';
import { NavLink } from 'react-router-dom';
import { SEARCH_ROUTE } from '../../router/consts';

export const SearchField: React.FC = () => {

    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tags = text.split(' ');
        dispatch(searchLessons(tags));
    };

    return (
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input 
                className={styles.input}
                placeholder="Поиск"
                onChange={handleChange}
            />
            <NavLink to={SEARCH_ROUTE}>
            <button className={styles.button} type="submit">
                <SearchIcon/>
            </button>
            </NavLink>
        </form>
    );
};
