import React, {useState} from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Loader } from '../Loading/Loader';
import { Login } from './Login';
import { Registration } from './Registration';
import styles from './styles.module.scss';

export enum authPages {
    login = 'login',
    registration = 'registration',
};

const initialState = authPages.login;

export const Auth: React.FC = () => {

    const loading = useTypedSelector(state => state.auth.loading);

    const [page, setPage] = useState(initialState);

    if (loading) {
        return <div className={styles.page}><Loader/></div>
    }

    return page === authPages.login ? (
        <div className={styles.page}>
            <Login setPage={setPage} registration={authPages.registration}/> 
         </div>
    ) : (
        <div className={styles.page}>
            <Registration setPage={setPage} login={authPages.login}/>
        </div>
    );
};
