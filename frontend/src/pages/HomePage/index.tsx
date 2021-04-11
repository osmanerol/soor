import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Filter, InstructorCard, Button, Comment, Footer } from '../../components';
import { Link } from 'react-router-dom';
import student from '../../assets/images/student.svg';
import teacher from '../../assets/images/teacher.svg';
import lesson from '../../assets/images/lesson.svg';

const Index = () => {
    const instructors = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/instructor/justin-hammer', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1499358517822-d8578907a095?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Barbara Hammer', slug:'/instructor/barbara-hammer', job:'Kimya Öğretmeni', rate:3, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/instructor/jessica-jones', job:'Fizik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Ashley Jones', slug:'/instructor/ashley-jones', job:'Türkçe Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/instructor/barbara-hammer', job:'Edebiyat Öğretmeni', rate:5, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'/instructor/rebecca-jones', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'/instructor/jason-roy', job:'Kimya Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'/instructor/katherine-roy', job:'Tarih Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'/instructor/itav-roy', job:'Fizik Öğretmeni', rate:4, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'/instructor/john-roy', job:'Biyoloji Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'/instructor/natasha-john', job:'Coğrafya Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', slug:'/instructor/victoria-john', job:'Tarih Öğretmeni', rate:5, price: 100 },
    ]

    const studentComments = [
        { image : 'https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Harvey Specter', content: 'This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
        { image : 'https://images.unsplash.com/photo-1614940873537-487b4741dbaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Christian Wayne', content: '  This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders', rate: 5},
        { image : 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg' , name: 'Valary Specter', content: ' This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
    ]

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    return (
        <>
            <div className='homepage-container'>
                <Filter />
                <Container>
                    <div className='instructors-container'>
                        <div className='text-center title-container'>
                            <h2 className='title'>Eğitmenler</h2>
                            <h2 className='sub-title mt-3'>Bu hafta ders veren eğitmenlerden bazıları :</h2>
                        </div>
                        <div className='instructors-list mt-2'>
                            {
                                instructors.map(item=>(
                                    <InstructorCard key={item.image} image={item.image} name={item.name} job={item.job} rate={item.rate} slug={item.slug} />
                                ))
                            }
                        </div>
                        <Button text='Tüm eğitmenleri gör' className='col-md-5 col-sm-8 col-12 mx-auto p-0 mx-0 mt-4 load-more-instructor-button' size='sm' as={Link} to='/all-instructors' />
                    </div>
                </Container>    
                <div className='students-comments-container'>
                    <Container>
                        <div className='text-center title-container'>
                            <h2 className='title'>Öğrenci Yorumları</h2>
                            <h2 className='sub-title mt-3'>Soor kullanan öğrenciler ne düsünüyor ?</h2>
                        </div>
                        <div className='comments-list'>
                            {
                                studentComments.map(item=>(
                                    <Comment key={item.image} image={item.image} name={item.name} content={item.content} rate={item.rate} />
                                ))
                            }
                        </div>
                    </Container>
                </div>
                <Container>
                    <div className='numeric-info-container'>
                        <div className='text-center title-container'>
                            <h2 className='title'>Sayılarla Soor</h2>
                            <h2 className='sub-title mt-3'>Şimdiye kadar toplam :</h2>
                        </div>
                        <div className='numeric-list mt-2'>
                            <div>
                                <img src={student} alt='student'/>
                                <p className='mt-3'>44 Öğrenci</p>
                            </div>
                            <div>
                                <img src={teacher} alt='teacher'/>
                                <p className='mt-3'>23 Eğitmen</p>
                            </div>
                            <div>
                                <img src={lesson} alt='lesson'/>
                                <p className='mt-3'>12 Canlı Ders</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;