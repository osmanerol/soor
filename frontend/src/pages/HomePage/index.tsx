import React from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { TeacherCard, Button, Comment } from '../../components';
import { Link } from 'react-router-dom';
import TypeWriter from 'typewriter-effect';
import homepage from '../../assets/images/homepage.svg';

const Index = () => {
    const teachers = [
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', to:'/teacher/justin-hammer', job:'Matematik Öğretmeni', rate:4 },
        { image:'https://images.unsplash.com/photo-1499358517822-d8578907a095?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Barbara Hammer', to:'/teacher/barbara-hammer', job:'Kimya Öğretmeni', rate:3 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', to:'/teacher/jessica-jones', job:'Fizik Öğretmeni', rate:4 },
        { image:'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Ashley Jones', to:'/teacher/ashley-jones', job:'Türkçe Öğretmeni', rate:4 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', to:'/teacher/barbara-hammer', job:'Edebiyat Öğretmeni', rate:5 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', to:'/teacher/rebecca-jones', job:'Matematik Öğretmeni', rate:4 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', to:'/teacher/jason-roy', job:'Kimya Öğretmeni', rate:4 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', to:'/teacher/katherine-roy', job:'Tarih Öğretmeni', rate:5 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', to:'/teacher/itav-roy', job:'Fizik Öğretmeni', rate:4 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', to:'/teacher/john-roy', job:'Biyoloji Öğretmeni', rate:4 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', to:'/teacher/natasha-john', job:'Coğrafya Öğretmeni', rate:5 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', to:'/teacher/victoria-john', job:'Tarih Öğretmeni', rate:5 }
    ]

    const studentComments = [
        { image : 'https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Harvey Specter', content: 'This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
        { image : 'https://images.unsplash.com/photo-1614940873537-487b4741dbaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Christian Wayne', content: '  Great theme and efficient support! So much choice for design layout and functionality backed up with very knowledgable support staff.', rate: 5},
        { image : 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg' , name: 'Valary Specter', content: ' This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
    ]

    return (
        <div className='homepage-container'>
            <Container>
                <div className="top-content-container row p-0 m-0">
                    <div className="col-md-6 col-12">
                        <h2 className='title'>
                            <TypeWriter
                                options={{
                                    strings: ['Bire bir dersler ve soru çözümleri', '7/24 anlık soru çözümü imkanı', 'Görüntülü görüşme ile hızlı ve anlaşılır çözümler', 'Tüm eğitim düzeylerinde farklı ders kategorileri', 'Uzman eğitmenler ile uzaktan eğitim'],
                                    autoStart: true,
                                    loop: true,
                                }}
                                onInit={(typewiter)=>{
                                    typewiter.pauseFor(100).deleteAll().start()
                                }}
                            />
                        </h2>
                    </div>
                    <div className="col-md-6 col-12 top-image">
                        <img src={homepage} alt="homepage"/>
                    </div>
                </div>
            </Container>
            <div className="numeric-info-container mb-4">
                <Container>
                    <div className="row">
                        <div className="col-md-6 title">
                            <h2 className='title'>Şimdiye Kadar Toplam</h2>
                        </div>
                        <div className="col-md-6 row text-center data p-0 m-0">
                            <div className="col-4">
                                <h3 className='number'>340</h3>
                                <p className='text'>Öğrenci</p>
                            </div>
                            <div className="col-4">
                                <h3 className='number'>145</h3>
                                <p className='text'>Eğitmen</p>
                            </div>
                            <div className="col-4">
                                <h3 className='number'>80</h3>
                                <p className='text'>Canlı Ders</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='instructors-container my-4'>
                    <div className="text-center">
                        <h2 className='title'>Eğitmenler</h2>
                        <h2 className='sub-title my-3 text-muted'>Bu hafta ders veren eğitmenlerden bazıları :</h2>
                    </div>
                    <div className="teachers-container row">
                        {
                            teachers.map(item=>(
                                <TeacherCard key={item.image} className="col-lg-3 col-md-4 col-6" image={item.image} name={item.name} to={item.to} job={item.job} rate={item.rate} />
                            ))
                        }
                        <div className="col-lg-4 col-md-5 col-sm-10 col-12 button-container mx-auto my-2">
                            <Button text='Tüm eğitmenleri gör' as={Link} to='/' size='sm' />
                        </div>
                    </div>
                </div>
            </Container>
            <div className="student-comments-container">
                <Container>
                    <div className="text-center">
                        <h2 className='title'>Öğrenci Yorumları</h2>
                        <div className='col-lg-5 col-md-7 col-12 mx-auto'>
                            <h2 className='sub-title my-3 text-muted'>Soor'da soru soran ve ders alan öğrencilerin Soor hakkındaki düşünceleri : </h2>
                        </div>
                    </div>
                    <div className="comments-container row">
                        {
                            studentComments.map(item=>(
                                <Comment className='col-lg-4 col-md-9 col-11 mx-auto' key={item.image} image={item.image} name={item.name} content={item.content} rate={item.rate} />
                            ))
                        }
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Index;