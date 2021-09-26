import React from 'react';
import { NavLinks } from '../NavLinks/NavLinks';
import styles from './styles.module.scss';

export const NavMenu: React.FC = () => {

    return (
        <div className={styles.nav}>
            <NavLinks/>
        </div>
    );
};
