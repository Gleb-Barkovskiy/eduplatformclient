import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

export const NavButtonLink: React.FC<{path: string, text: string, Icon: React.FC}> = ({path, text, Icon}) => {

    return (
        <NavLink className={styles.navlink} to={path}>
            <Icon/>
            <h3 className={styles.text}>{text}</h3>
        </NavLink>
    );
};
