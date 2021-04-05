import React from 'react';
import './App.scss';
import { Switch, Route, useLocation} from 'react-router-dom';

import { Navbar } from './components'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LessonFilterPage from './pages/LessonFilterPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
/*
import LessonFilterPage from './pages/LessonFilterPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import StudentProfilePage from './pages/StudentProfilePage';
import NotFoundPage from './pages/NotFoundPage';
*/

const App = () => {
  const location= useLocation();

  return (
    <>
      { 
        (!location.pathname.includes('login') && !location.pathname.includes('signup')) && <Navbar />
      }
      <Switch>
        <Route path='/' exact strict component={HomePage} />
        <Route path='/login' exact strict component={LoginPage} />
        <Route path='/signup' exact strict component={SignupPage} />
        <Route path='/lesson-filter/:lesson' exact strict component={LessonFilterPage} />
        <Route path='/teacher/:teacher' exact strict component={TeacherProfilePage} />
        {
          /*
        <Route path='/lesson-filter/:lesson' exact strict component={LessonFilterPage} />
        <Route path='/teacher/:teacher' exact strict component={TeacherProfilePage} />
        <Route path='/student/:student' exact strict component={StudentProfilePage} />
        <Route exact strict component={NotFoundPage} />
          */
        }
      </Switch>
    </>
  );
};

export default App;