import React, { useEffect } from 'react';
import './index.scss';
import { Footer } from '../../components';
import { Container, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Index = () => {
    const lessonsSummary = [
        { date: '05.04.2021-09.00', lesson: 'Matematik', instructor: 'Jessica Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 1},
        { date: '10.03.2021-10.00', lesson: 'Fizik', instructor: 'Justin Hammer', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '09.02.2021-11.00', lesson: 'Biyoloji', instructor: 'Barbara Hammer', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '06.02.2021-14.00', lesson: 'Kimya', instructor: 'Jessica Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '01.02.2021-15.00', lesson: 'Geometri', instructor: 'Jessica Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '06.02.2021-08.00', lesson: 'Kimya', instructor: 'Victoria Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '01.02.2021-09.00', lesson: 'Geometri', instructor: 'Jessica Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '06.02.2021-10.00', lesson: 'Kimya', instructor: 'Rebecca Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '01.02.2021-12.00', lesson: 'Geometri', instructor: 'Jason Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '06.02.2021-14.00', lesson: 'Kimya', instructor: 'Jessica Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
        { date: '01.02.2021-17.00', lesson: 'Geometri', instructor: 'Ashley Jones', slug:'jessica-jones', link: 'https://www.google.com', status: 0},
    ]
    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    return (
        <>
            <div className='lessons-page-container'>
                <Container>
                    <div className='text-center py-4'>
                        <h2 className='title'>Derslerim</h2>
                    </div>
                    <div className="lessons">
                        <Table responsive className='mb-0'>
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Ders</th>
                                    <th>Eğitmen</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lessonsSummary.length > 0 && lessonsSummary.map((item, index)=>(
                                        <tr key={index} className={`${item.status === 0 ? 'bg-light' : ''}`}>
                                            <td>{item.date}</td>
                                            <td>{item.lesson}</td>
                                            <td><Link to={`/instructor/${item.instructor}`}>{item.instructor}</Link></td>
                                            <td>
                                                {
                                                    item.status === 1 ?
                                                    <Link to={item.link}>Derse git</Link> :
                                                    <p>Derse git</p>
                                                }
                                            </td>
                                        </tr>
                                    )) 
                                }
                            </tbody>
                        </Table>
                        {
                            lessonsSummary.length < 1  &&
                            <div className='empty-message w-100 mt-4 text-center'>
                                <p className='text'>Ders alma geçmişi boş.</p>
                            </div>
                        }
                        {
                            lessonsSummary.length > 0 && 
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
                        }
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;