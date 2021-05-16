import React, { FC, useState, useEffect, useCallback } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Empty, Spinner, Footer } from '../../components';
import { Container, Pagination, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames';
import LessonStore from '../../application/lesson/store/lessonStore';
import InstructorStore from '../../application/instructor/store/instructorStore';
import StudentStore from '../../application/student/store/studentStore';

interface IDefaultProps {
    LessonStore? : typeof LessonStore,
    InstructorStore? : typeof InstructorStore,
    StudentStore? : typeof StudentStore
}

const Index : FC<IDefaultProps> = inject('LessonStore', 'InstructorStore', 'StudentStore')(observer((props : IDefaultProps) => {
    const { LessonStore : store, InstructorStore : instructorStore, StudentStore : studentStore } = props;
    const [searchPage, setSearchPage] = useState<number>(1);
    const [userType, setUserType] = useState<number>(0);
    const history = useHistory();

    const getLessonList = useCallback(async () => {
        if(userType === 1){
            await store!.getStudentLesson(searchPage);
        }
        else if(userType === 2){
            await store!.getInstructorLesson(searchPage);
        }
    }, [store, userType, searchPage])

    useEffect(()=>{ 
        document.title = 'Soor - Derslerim';
        window.scrollTo(0,0);
        if(localStorage.getItem('userType') === '1'){
            setUserType(1);
        }
        else if(localStorage.getItem('userType') === '2'){
            setUserType(2);
        }
        getLessonList();
    }, [store, getLessonList])

    const cancelLesson = async (lessonItem : any) => {
        if(!lessonItem.instructorStatus){
            await instructorStore!.decreaseInstructorBalance(lessonItem.instructor.id);
            await studentStore!.increaseStudentCredit(lessonItem.instructor.lessonPrice);
            await store!.deleteLesson(lessonItem.id);
            store!.lessonList.results = store!.lessonList.results!.filter(item => item.id !== lessonItem.id);
            store!.lessonList.count -= 1;
        }
    }
    
    const goCallPage = async (lessonItem : any) => {
        let condition = userType === 1 ? !lessonItem.studentStatus : !lessonItem.instructorStatus;
        if(condition){
            if(userType === 1){
                await store!.updateLessonStatus(lessonItem.id, 1);
            }
            else if(userType === 2){
                await store!.updateLessonStatus(lessonItem.id, 2);
            }
            store!.lessonList.results = store!.lessonList.results!.map(item => {
                if(item.id === lessonItem.id){
                    if(userType === 1){
                        item.studentStatus = true;
                    }
                    else if(userType === 2){
                        item.instructorStatus = true;
                    }
                }
                return item;
            });
            if(userType === 2){
                await instructorStore!.updateStatus(2);
            }
            history.push(`/call/${lessonItem.link}`);
        }
    }

    return (
        <>
            <div className='lessons-page-container'>
                <Container>
                        <div className='text-center py-4'>
                            <h2 className='title'>Derslerim</h2>
                        </div>
                        {
                            store!.lessonList.isLoading ? 
                            <Spinner /> :
                            store!.lessonList.count > 0 ?
                            <div className="lessons">
                                <Table responsive className='mb-0'>
                                    <thead>
                                        <tr>
                                            <th className='sub-text'>Tarih</th>
                                            <th className='sub-text'>Ders</th>
                                            <th className='sub-text'>{localStorage.getItem('userType') === '1' ? 'Eğitmen' : 'Öğrenci'}</th>
                                            <th className='sub-text'>Link</th>
                                            {
                                                localStorage.getItem('userType') === '1' &&
                                                <th className='sub-text'>İptal</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store!.lessonList.results!.map((item : any, index : number)=>(
                                                <tr key={index} className={cx({'bg-light' : userType === 1 ? item.studentStatus : item.instructorStatus})}>
                                                    <td className='sub-text'>{item.created}</td>
                                                    <td className='sub-text'>{item.lecture.name}</td>
                                                    <td className='sub-text'>
                                                        <Link to={`/instructor/${item.instructor.slug}`} >{localStorage.getItem('userType') === '1' ? `${item.instructor.first_name} ${item.instructor.last_name}` : `${item.student.first_name} ${item.student.last_name}`}</Link>
                                                    </td>
                                                    <td className={cx({'sub-text' : true, 'pointer' : userType === 1 ? !item.studentStatus : !item.instructorStatus })} onClick={() => goCallPage(item)}>Derse git</td>
                                                    {
                                                        userType === 1 &&
                                                        <td className={cx({'sub-text' : true, 'pointer' :!item.instructorStatus })} onClick={() => cancelLesson(item)}>İptal Et</td>
                                                    }
                                                </tr>
                                            )) 
                                        }
                                    </tbody>
                                </Table>    
                                {
                                    (!store!.lessonList.isLoading && store!.lessonList.results!.length > 10) &&
                                    <small className='pagination-container mt-3'>
                                        <Pagination>
                                            <Pagination.First onClick={()=>{setSearchPage(1)}} />
                                            <Pagination.Prev onClick={()=>{setSearchPage(searchPage > 1 ? searchPage-1 : 1)}} />
                                            <Pagination.Item onClick={()=>{}} >{searchPage}</Pagination.Item>
                                            <Pagination.Next onClick={()=>{setSearchPage(searchPage === Math.ceil(store!.lessonList.count/10) ? searchPage : searchPage+1)}} />
                                            <Pagination.Last onClick={()=>{setSearchPage(Math.ceil(store!.lessonList.count/10))}} />
                                        </Pagination>
                                    </small>
                                }
                            </div> :
                            <Empty text='Ders alma geçmişi boş.' showButton={false} />
                        }
                    </Container>
                </div>
            <Footer />
        </>
    );
}));

export default Index;