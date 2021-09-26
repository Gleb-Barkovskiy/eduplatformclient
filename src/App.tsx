import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClientRouter } from './router/ClientRouter';
import { Navbar } from './components/Navbar/Navbar';
import { checkAuth } from './store/auth/actions/authActions';
import { useDispatch } from 'react-redux';
import './index.scss';
import { NavMenu } from './components/Navbar/NavMenu/NavMenu';


export const App:React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(checkAuth());
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar/>
        <NavMenu/>
        <ClientRouter/>
      </div>
    </BrowserRouter>
  );
};
