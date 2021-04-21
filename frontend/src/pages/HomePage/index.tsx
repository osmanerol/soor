import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { InstructorCard, Button, Comment, Footer } from '../../components';
import { Link } from 'react-router-dom';
import expected1 from '../../assets/images/expected-1.jpg';
import expected2 from '../../assets/images/expected-2.jpg';
import expected3 from '../../assets/images/expected-3.jpg';

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const instructors = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'justin-hammer', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1499358517822-d8578907a095?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Barbara Hammer', slug:'barbara-hammer', job:'Kimya Öğretmeni', rate:3, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'jessica-jones', job:'Fizik Öğretmeni', rate:4, price: 80 },
        { image:'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Ashley Jones', slug:'ashley-jones', job:'Türkçe Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'barbara-hammer', job:'Edebiyat Öğretmeni', rate:5, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'rebecca-jones', job:'Matematik Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'jason-roy', job:'Kimya Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'katherine-roy', job:'Tarih Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'itav-roy', job:'Fizik Öğretmeni', rate:4, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'john-roy', job:'Biyoloji Öğretmeni', rate:4, price: 80 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'natasha-john', job:'Coğrafya Öğretmeni', rate:5, price: 80 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', slug:'victoria-john', job:'Tarih Öğretmeni', rate:5, price: 100 },
    ]

    const studentComments = [
        { image : 'https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Harvey Specter', content: 'This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
        { image : 'https://images.unsplash.com/photo-1614940873537-487b4741dbaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Christian Wayne', content: '  This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders', rate: 5},
        { image : 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg' , name: 'Valary Specter', content: ' This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
    ]

    useEffect(()=>{
        window.scrollTo(0,0);
        setIsLoggedIn(true);
    }, [])

    return (
        <>
            <div className='homepage-container'>
                <div className="cover">
                    <Container>
                        <div className="col-lg-7 col-md-9 col-sm-10 col-12 content">
                            <p className='cover-title'>Yüzlerce Çevrimiçi Eğitmene Sorularını SOOR</p>
                            <p className='cover-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quam? Ea quasi autem deleniti alias? Aperiam blanditiis exercitationem ea eligendi</p>
                            <div className="button-container">
                                {
                                    isLoggedIn ? 
                                    <>
                                        <Button text='Ders Seç' className='filter-button' as={Link} to='/lesson-filter' />
                                    </> :  
                                    <>
                                        <Button text='Giriş Yap' className='filter-button' as={Link} to='/login' />
                                        <Button text='Kaydol' className='login-button' as={Link} to='/signup' />
                                    </>
                                }
                            </div>
                        </div>
                    </Container>
                </div>
                <Container>
                    <div className="expected-container">
                        <h2 className='title text-center'>SOOR'da seni neler bekliyor ?</h2>
                        <div className="items-container">
                            <div className="item">
                                <div className="image-container">
                                    <img src={expected1} alt="item"/>
                                </div>
                                <div className="text-container text-center">
                                    <h2 className='sub-title text-center mb-3'>Soru çözümü</h2>
                                    <p className='sub-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo recusandae consequuntur quaerat reiciendis .</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="image-container">
                                    <img src={expected2} alt="item"/>
                                </div>
                                <div className="text-container text-center">
                                    <h2 className='sub-title text-center mb-3'>Canlı Ders</h2>
                                    <p className='sub-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo recusandae consequuntur quaerat reiciendis .</p>
                                </div>
                            </div>
                            <div className="item text-center">
                                <div className="image-container">
                                    <img src={expected3} alt="item"/>
                                </div>
                                <div className="text-container text-center">
                                    <h2 className='sub-title text-center mb-3'>Danışmanlık</h2>
                                    <p className='sub-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo recusandae consequuntur quaerat reiciendis .</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="instructors-container">
                        <h2 className='title text-center'>Bu hafta ders veren eğitmenlerden bazıları :</h2>
                        <div className="instructor-list">
                            {
                                instructors.map(item=>(
                                    <InstructorCard key={item.image} image={item.image} name={item.name} job={item.job} rate={item.rate} slug={item.slug} />
                                ))
                            }
                        </div>
                    </div>
                </Container>
                <div className="total-datas-container">
                    <Container className='total-datas-content'>
                        <div className="row">
                            <div className="col-md-6 col-12 text-center">
                                <h2 className="total-datas-title">SOOR olarak her geçen gün büyümeye devam ediyoruz.</h2>
                            </div>
                            <div className="col-md-6 col-12">
                                <p className='total-datas-text title text-center mb-4'>Şimdiye kadar toplam : </p>
                                <div className="items">
                                    <div className="item">
                                        <span className='title'>44</span>
                                        <span className='sub-title'>Öğrenci</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>30</span>
                                        <span className='sub-title'>Eğitmen</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>25</span>
                                        <span className='sub-title'>Canlı Ders</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='students-comments-container'>
                    <Container>
                        <h2 className='title text-center'>Öğrenci Yorumları</h2>
                        <div className='comment-list'>
                            {
                                studentComments.map((item, index)=>(
                                    <Comment key={index} image={item.image} name={item.name} content={item.content} rate={item.rate} />
                                ))
                            }
                        </div>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Index;