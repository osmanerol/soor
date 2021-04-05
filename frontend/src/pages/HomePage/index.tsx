import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Filter, TeacherCard, Button, Comment, Footer } from '../../components';
import { Link } from 'react-router-dom';
import student from '../../assets/images/student.svg';
import teacher from '../../assets/images/teacher.svg';
import lesson from '../../assets/images/lesson.svg';

const Index = () => {
    const teachers = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/teacher/justin-hammer', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1499358517822-d8578907a095?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Barbara Hammer', slug:'/teacher/barbara-hammer', job:'Kimya Öğretmeni', rate:3, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/teacher/jessica-jones', job:'Fizik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Ashley Jones', slug:'/teacher/ashley-jones', job:'Türkçe Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/teacher/barbara-hammer', job:'Edebiyat Öğretmeni', rate:5, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'/teacher/rebecca-jones', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'/teacher/jason-roy', job:'Kimya Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'/teacher/katherine-roy', job:'Tarih Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'/teacher/itav-roy', job:'Fizik Öğretmeni', rate:4, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'/teacher/john-roy', job:'Biyoloji Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'/teacher/natasha-john', job:'Coğrafya Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', slug:'/teacher/victoria-john', job:'Tarih Öğretmeni', rate:5, price: 100 }
    ]

    const studentComments = [
        { image : 'https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Harvey Specter', content: 'This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
        { image : 'https://images.unsplash.com/photo-1614940873537-487b4741dbaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Christian Wayne', content: '  Great theme and efficient support! So much choice for design layout and functionality backed up with very knowledgable support staff.', rate: 5},
        { image : 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg' , name: 'Valary Specter', content: ' This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
    ]

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    })

    return (
        <>
            <div className='homepage-container'>
                <Filter />
                <Container>
                    <div className='instructors-container'>
                        <div className='text-center pb-4'>
                            <h2 className='title'>Eğitmenler</h2>
                            <h2 className='sub-title my-3 text-muted'>Bu hafta ders veren eğitmenlerden bazıları :</h2>
                        </div>
                        <div className='teachers-container row'>
                            {
                                teachers.map(item=>(
                                    <TeacherCard key={item.image} className='col-lg-3 col-md-4 col-6' image={item.image} name={item.name} slug={item.slug} job={item.job} rate={item.rate} price={item.price} />
                                ))
                            }
                            <div className='col-lg-4 col-md-5 col-sm-10 col-12 button-container mx-auto mt-2'>
                                <Button text='Tüm eğitmenleri gör' as={Link} to='/' size='sm' />
                            </div>
                        </div>
                    </div>
                </Container>
                <div className='student-comments-container'>
                    <Container>
                        <div className='text-center'>
                            <h2 className='title'>Öğrenci Yorumları</h2>
                            <div className='col-lg-5 col-md-7 col-12 mx-auto'>
                                <h2 className='sub-title my-3 text-muted'>Soor'da soru soran ve ders alan öğrencilerin Soor hakkındaki düşünceleri : </h2>
                            </div>
                        </div>
                        <div className='comments-container row'>
                            {
                                studentComments.map(item=>(
                                    <Comment className='col-lg-4 col-md-9 col-11 mx-auto' key={item.image} image={item.image} name={item.name} content={item.content} rate={item.rate} />
                                ))
                            }
                        </div>
                    </Container>
                </div>
                <Container>
                    <div className='numeric-info-container'>
                        <div className='text-center pb-4'>
                            <h2 className='title'>Sayılarla Soor</h2>
                            <h2 className='sub-title my-3 text-muted'>Şimdiye kadar toplam :</h2>
                        </div>
                        <div className='row p-0 m-0'>
                            <div className='col-lg-4 col-md-4 col-12 mx-auto'>
                                <div className='item'>
                                    <img src={student} alt='student mx-auto'/>
                                    <h2 className='sub-title mt-2'>340 Öğrenci</h2>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-12 mx-auto'>
                                <div className='item'>
                                    <img src={teacher} alt='teacher'/>
                                    <h2 className='sub-title mt-2'>76 Eğitmen</h2>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-12 mx-auto'>
                                <div className='item'>
                                    <img src={lesson} alt='lesson'/>
                                    <h2 className='sub-title mt-2'>44 Online Ders</h2>
                                </div>
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