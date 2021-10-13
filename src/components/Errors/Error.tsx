import React from 'react';
import styles from './styles.module.scss';

export const Error: React.FC<{text: string}> = ({text}) => {
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <h3>{text}</h3>
            </div>
        </div>
    );
};
