import React from 'react';
import { NavLinks } from './NavLinks/NavLinks';
import styles from './styles.module.scss';

export const NavMenu: React.FC<{setMenuOpen: Function}> = ({setMenuOpen}) => {
    return (
        <div className={styles.navigation} onClick={() => setMenuOpen(false)}>
            <NavLinks/>
        </div>
    );
};
