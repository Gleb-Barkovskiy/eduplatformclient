import React from 'react';
import styles from './styles.module.scss';

export const Loader: React.FC = () => {

    return (
        <div className={styles.loader}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
            <div className={styles.bar4}></div>
            <div className={styles.bar5}></div>
            <div className={styles.bar6}></div>
            <div className={styles.bar7}></div>
            <div className={styles.bar8}></div>
        </div>
    );
};
