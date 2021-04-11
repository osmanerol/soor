import React from 'react';
import './App.scss';
import { Switch, Route, useLocation} from 'react-router-dom';

import { Navbar } from './components'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LessonFilterPage from './pages/LessonFilterPage';
import InstructorPage from './pages/InstructorPage';
import AllInstructorsPage from './pages/AllInstructorsPage';
import LessonsPage from './pages/LessonsPage';
import NotFoundPage from './pages/NotFoundPage';

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
        <Route path='/instructor/:instructor' exact strict component={InstructorPage} />
        <Route path='/all-instructors' exact strict component={AllInstructorsPage} />
        <Route path='/lessons' exact strict component={LessonsPage} />
        <Route exact strict component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;