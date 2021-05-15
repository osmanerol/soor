import React, { FC, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Empty, Spinner, Footer } from '../../components';
import { Container, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import LessonStore from '../../application/lesson/store/lessonStore';

interface IDefaultProps {
    LessonStore? : typeof LessonStore,
}

const Index : FC<IDefaultProps> = inject('LessonStore')(observer((props : IDefaultProps) => {
    const { LessonStore : store } = props;

    useEffect(()=>{
        document.title = 'Soor - Derslerim';
        window.scrollTo(0,0);
        const getLessonList = async () => {
            store!.createLessonList();
            if(localStorage.getItem('userType') === '1'){
                await store!.getStudentLesson();
            }
            else if(localStorage.getItem('userType') === '2'){
                await store!.getInstructorLesson();
            }
        }
        getLessonList();
    }, [store])

    const updateLessonStatus = async (id : number, status : number, lessonPrice : number) => {
        if(status !== 2){
            await store!.updateLessonStatus(id);
            localStorage.setItem('lessonPrice', lessonPrice.toString());
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
                                            <th className='sub-text'>Eğitmen</th>
                                            <th className='sub-text'>Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store!.lessonList.results!.map((item : any, index : number)=>(
                                                <tr key={index} className={cx({'bg-light' : item.status >= 2})}>
                                                    <td className='sub-text'>{item.created}</td>
                                                    <td className='sub-text'>{item.lecture.name}</td>
                                                    <td className='sub-text'>{item.instructor.first_name} {item.instructor.last_name}</td>
                                                    <td className='sub-text' onClick={() => updateLessonStatus(item.id, item.status, item.instructor.lessonPrice)}>
                                                        {
                                                            item.status === 0 || item.status === 1 ?
                                                            <Link to={`/call/${item.link}`}>Derse git</Link> :
                                                            <p>Derse git</p>
                                                        }
                                                    </td>
                                                </tr>
                                            )) 
                                        }
                                    </tbody>
                                </Table>    
                                <small className='pagination-container my-4'>
                                    <Pagination>
                                        <Pagination.First />
                                        <Pagination.Prev />
                                        <Pagination.Item>{1}</Pagination.Item>
                                        <Pagination.Item>{2}</Pagination.Item>
                                        <Pagination.Ellipsis />
                                        <Pagination.Item>{7}</Pagination.Item>
                                        <Pagination.Item>{8}</Pagination.Item>
                                        <Pagination.Next />
                                        <Pagination.Last />
                                    </Pagination>
                                </small>
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
/*
    const lessonsSummary = [
        { date: '05.04.2021-09.00', lesson: 'Matematik', instructor: 'Jessica Jones', slug:'jessica-jones', link: '/lesson', status: 1},
        { date: '10.03.2021-10.00', lesson: 'Fizik', instructor: 'Justin Hammer', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '09.02.2021-11.00', lesson: 'Biyoloji', instructor: 'Barbara Hammer', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '06.02.2021-14.00', lesson: 'Kimya', instructor: 'Jessica Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '01.02.2021-15.00', lesson: 'Geometri', instructor: 'Jessica Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '06.02.2021-08.00', lesson: 'Kimya', instructor: 'Victoria Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '01.02.2021-09.00', lesson: 'Geometri', instructor: 'Jessica Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '06.02.2021-10.00', lesson: 'Kimya', instructor: 'Rebecca Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '01.02.2021-12.00', lesson: 'Geometri', instructor: 'Jason Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '06.02.2021-14.00', lesson: 'Kimya', instructor: 'Jessica Jones', slug:'jessica-jones', link: '/lesson', status: 0},
        { date: '01.02.2021-17.00', lesson: 'Geometri', instructor: 'Ashley Jones', slug:'jessica-jones', link: '/lesson', status: 0},
    ]
    
*/