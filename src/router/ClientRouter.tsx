import React from 'react';
import { privateRoutes, publicRoutes } from './routes';
import {Switch, Route, Redirect} from 'react-router-dom';
import { LESSONS_ROUTE } from './consts';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const ClientRouter:React.FC = () => {
    const user = useTypedSelector(state => state.auth.isAuth);
    return user ? (
        <Switch>
            {privateRoutes.map((route) => (
                <Route key="{route}" exact path={route.path} component={route.component}/>
            ))};
            <Redirect to={LESSONS_ROUTE}/>
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map((route) => (
                <Route key="{route}" exact path={route.path} component={route.component}/>
            ))};
             <Redirect to={LESSONS_ROUTE}/>
        </Switch>
    );
};