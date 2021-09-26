import React, {useState} from 'react';
import { Login } from './Login';
import { Registration } from './Registration';
import styles from './styles.module.scss';

export enum authPages {
    login = 'login',
    registration = 'registration',
};

const initialState = authPages.login;

export const Auth: React.FC = () => {

    const [page, setPage] = useState(initialState);

    return page === authPages.login ? (
        <div className="page">
            <div className={styles.container}>
                <Login setPage={setPage} registration={authPages.registration}/> 
            </div>
         </div>
    ) : (
        <div className="page">
            <div className={styles.container}>
                <Registration setPage={setPage} login={authPages.login}/>
            </div>
        </div>
    );
};
