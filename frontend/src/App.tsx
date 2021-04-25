import React, { useState, useEffect } from 'react';
import './App.scss';
import { Switch, Route, useLocation} from 'react-router-dom';
import { Navbar } from './components'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LessonFilterPage from './pages/LessonFilterPage';
import InstructorPage from './pages/InstructorPage';
import LessonsPage from './pages/LessonsPage';
import MessagePage from './pages/MessagePage';
import MessageDetailPage from './pages/MessageDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { Container } from 'react-bootstrap';

const App = () => {
  const [isSmallScreen, setSmallScreen] = useState(false);
  const location= useLocation();

  const setScreen=()=>{
    if(window.innerWidth<=768){
      setSmallScreen(true);
    }
    else{
      setSmallScreen(false);
    }
  }

  useEffect(()=>{
    setScreen();
  }, [])
 
  useEffect(()=>{
    window.addEventListener('resize', setScreen);
  })

  return (
    <>
      { 
        !(isSmallScreen && location.pathname.includes('/messages/')) && <Navbar />
      }
      <Switch>
        <Route path='/' exact strict component={HomePage} />
        <Route path='/login' exact strict component={LoginPage} />
        <Route path='/signup' exact strict component={SignupPage} />
        <Route path='/lesson-filter' exact strict component={LessonFilterPage} />
        <Route path='/lesson-filter/:lesson' exact strict component={LessonFilterPage} />
        <Route path='/instructor/:instructor' exact strict component={InstructorPage} />
        <Route path='/lessons' exact strict component={LessonsPage} />
        <Route path='/settings' exact strict component={SettingsPage} />
        <Route path='/messages' exact={isSmallScreen} strict component={MessagePage} /> 
        {
          isSmallScreen &&
          <Route path='/messages/:slug' exact strict children={()=>(
            <Container>
              <MessageDetailPage /> 
            </Container>
          )} /> 
        }
        <Route exact strict component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;