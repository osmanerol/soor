import React, { FC, useEffect } from 'react';
import './App.scss';
import { Switch, Route} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Navbar } from './components'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LessonFilterPage from './pages/LessonFilterPage';
import InstructorPage from './pages/InstructorPage';
import LessonsPage from './pages/LessonsPage';
import InstructorSettingsPage from './pages/InstructorSettingsPage';
import StudentSettingsPage from './pages/StudentSettingsPage';
import VideoCallPage from './pages/VideoCallPage';
import NotFoundPage from './pages/NotFoundPage';
import { PrivateRoute } from './components';
import UserStore from './application/user/store/userStore';
import InstructorStore from './application/instructor/store/instructorStore';
import StudentStore from './application/student/store/studentStore';

interface IDefaultProps {
  UserStore? : typeof UserStore;
  InstructorStore? : typeof InstructorStore;
  StudentStore? : typeof StudentStore;
}

const App : FC<IDefaultProps> = inject('UserStore', 'InstructorStore', 'StudentStore')(observer((props : IDefaultProps) => {
  const { UserStore : userStore, InstructorStore : instructorStore, StudentStore : studentStore } = props;
  
  useEffect(() => {
    const getUser = async () => {
      if(localStorage.getItem('token')){
        await userStore?.getUser();
        if(localStorage.getItem('userType') === '1' && studentStore?.student.id === 0){
          await studentStore?.getProfile();
        }
        else if(localStorage.getItem('userType') === '2' && instructorStore?.instructor.id === 0){
          await instructorStore?.getProfile();
        }
      }
    }
    getUser();
  }, [userStore, studentStore, instructorStore])

  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact strict component={HomePage} />
        <Route path='/login' exact strict component={LoginPage} />
        <Route path='/signup' exact strict component={SignupPage} />
        <Route path='/lesson-filter' exact strict component={LessonFilterPage} />
        <Route path='/lesson-filter/:lesson' exact strict component={LessonFilterPage} />
        <Route path='/call' exact strict component={VideoCallPage} />
        <PrivateRoute path='/settings/instructor' exact strict component={InstructorSettingsPage} />
        <PrivateRoute path='/settings/student' exact strict component={StudentSettingsPage} />
        <Route path='/instructor/:slug' exact strict component={InstructorPage} />
        <PrivateRoute path='/lessons' exact strict component={LessonsPage} />
        <Route exact strict component={NotFoundPage} />
      </Switch>
    </>
  );
}));

export default App;