import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom';
import { AUTH_ROUTE } from '../../router/consts';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { singOutUser } from '../../store/auth/actions/authActions';
import styles from './styles.module.scss';
import { SearchField } from '../Search/SearchField';


export const Navbar: React.FC = () => {

    const dispatch = useDispatch();

    const user = useTypedSelector(state => state.auth.auth?.user);

    const logout = () => {
        dispatch(singOutUser());
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}><LibraryBooksIcon/>eduplatform</h1>
            <div className={styles.search}>
                <SearchField/>
            </div>
            {!user ? ( 
            <NavLink className={styles.log} to={AUTH_ROUTE}>
                <PersonIcon/>
            </NavLink>
            ) : (
            <>
                <h3 className={styles.username}>{user.firstName}</h3>
                <button className={styles.log} onClick={() => {logout()}}>
                    <ExitToAppIcon/>
                </button>
            </>
            )}
        </header>
    );
};