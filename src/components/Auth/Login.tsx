import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { signInUser } from "../../store/auth/actions/authActions";
import styles from './styles.module.scss';

enum loginInputNames {
    email = 'email', 
    password = 'password', 
};
interface loginFields {
    email: string,
    password: string
};
const initialState:loginFields = {
    email: '',
    password: ''
};

export const Login:React.FC<{setPage: Function, registration: string}> = ({setPage, registration}) => {

    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState(initialState);

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>):void => {
        e.preventDefault();
        dispatch(signInUser(loginData));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    return (
        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <input 
                className={styles.input}
                placeholder='Email'
                onChange={handleChange}
                name={loginInputNames.email} 
            />
            <input  
                className={styles.input}
                placeholder='Пароль' 
                onChange={handleChange}
                name={loginInputNames.password}
            />
            <button className={styles.submitButton} type="submit"> 
                Войти
            </button>
            <p
                className={styles.link}
                onClick={() => {
                        setPage(registration)
                    }
                }
            > Нет аккаунта?
            </p>  
        </form>
    );
};
