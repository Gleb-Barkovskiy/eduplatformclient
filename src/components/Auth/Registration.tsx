import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../store/auth/actions/authActions";
import styles from './styles.module.scss';

enum userInputNames {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  password = "password",
}
interface userFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const initialState: userFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};


export const Registration: React.FC<{setPage: Function, login: string}> = ({setPage, login}) => {

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(initialState);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(signUpUser(userData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
      <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2>Регистрация</h2>
          <input
            className={styles.input}
            placeholder="Имя"
            onChange={handleChange}
            name={userInputNames.firstName}
          />
          <input
            className={styles.input}
            placeholder="Фамилия"
            onChange={handleChange}
            name={userInputNames.lastName}
          />
          <input
            className={styles.input}
            placeholder="Email"
            onChange={handleChange}
            name={userInputNames.email}
          />
          <input
            className={styles.input}
            placeholder="Пароль"
            onChange={handleChange}
            name={userInputNames.password}
          />
          <button className={styles.submitButton} type="submit">
            Зарегистрироваться
          </button>
          <p 
            className={styles.link}
            onClick={() => {
                setPage(login)
            }}
            > Уже есть аккаунт?
          </p>
      </form>
  );
};
