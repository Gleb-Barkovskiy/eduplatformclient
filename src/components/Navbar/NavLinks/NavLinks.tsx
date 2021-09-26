import React from 'react'
import { CREATE_ROUTE, FAVORITES_ROUTE, HISTORY_ROUTE, LESSONS_ROUTE, PROFILE_ROUTE } from '../../../router/consts';
import { NavButtonLink } from './NavButtonLink';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './styles.module.scss';

interface NavButtonLinkType {
    path: string,
    text: string,
    component: React.FC
};

export const NavLinks: React.FC = () => {

    const user = useTypedSelector(state => state.auth.isAuth);

    const currentLinks: Array<NavButtonLinkType> = !user ? [
        {path: LESSONS_ROUTE, text: 'Главная', component: HomeOutlinedIcon},
    ] : [
        {path: LESSONS_ROUTE, text: 'Главная', component: HomeOutlinedIcon},
        {path: PROFILE_ROUTE, text: 'Профиль', component: FaceOutlinedIcon},
        {path: FAVORITES_ROUTE, text: 'Понравилось', component: FavoriteBorderOutlinedIcon},
        {path: HISTORY_ROUTE, text: 'История', component: VisibilityOutlinedIcon},
        {path: CREATE_ROUTE, text: 'Создать урок', component: AddIcon},
    ];

    return (
        <div className={styles.navlinks}>
            {currentLinks.map(link => (
                <NavButtonLink key={link.path} path={link.path} text={link.text} Icon={link.component}/>
            ))}
        </div>
    );
};
