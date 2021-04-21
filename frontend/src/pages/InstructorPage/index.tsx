import React, { useEffect } from 'react';
import './index.scss';
import { Button, TakeLessonModal, MessageModal, CommentDetail, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Index = () => {
    const user = {
        image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg',
        firstName: 'Jessica',
        lastName: 'Jones',
        status: 1,
        job: 'Fizik Öğretmeni',
        email: 'jessicajones@gmail.com',
        university: 'İstanbul Üniversitesi Cerrahpaşa',
        department: 'Fizik Öğretmenliği',
        rate: 4.1,
        totalLesson: 22, 
        lessonPrice: 80,
        totalComment: 30,
        lessons: [{id: 0, name: 'Fizik'}, {id: 1, name: 'Matematik'}, {id: 2, name: 'Geometri'}],
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque reprehenderit excepturi voluptatem in odit quas mollitia! Recusandae doloremque sed necessitatibus doloribus voluptas corrupti iste rerum, nemo repellat incidunt expedita.Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iste, dolorum, quaerat suscipit sed provident quisquam dignissimos, minus velit sit quae nihil asperiores officia fugiat accusamus non cum! Ullam, soluta!'
    };

    const comments = [
        { image: 'https://images.unsplash.com/photo-1600603405959-6d623e92445c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Vickly Hladynets', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus quisquam quidem iusto totam porro quod vel, ad sapiente sunt nobis nulla cumque veniam, ipsum possimus, ut accusamus!', date: '15.03.2020'},
        { image: 'https://images.unsplash.com/photo-1468011749792-10026eb12caf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzd8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Allef Moyr', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.', date: '13.04.2020'},
        { image: 'https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Elizeus Diaz', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.', date: '13.04.2020'},
        { image: 'https://images.unsplash.com/photo-1605038593290-475661bfbba3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Amir Babei', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.Dolores molestiae dignissimos doloribus quisquam quidem iusto totam porro quod vel, ad sapiente sunt nobis nulla cumque veniam,', date: '20.06.2020'},
        { image: 'https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Ashley Roy', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.Dolores molestiae dignissimos.', date: '08.01.2020'},
    ]
    
    const instructors = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'justin-hammer', job:'Matematik Öğretmeni'},
        { image:'https://images.unsplash.com/photo-1499358517822-d8578907a095?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Barbara Hammer', slug:'barbara-hammer', job:'Kimya Öğretmeni', rate:3, price: 100 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'jessica-jones', job:'Fizik Öğretmeni'},
        { image:'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Ashley Jones', slug:'ashley-jones', job:'Türkçe Öğretmeni'},
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'barbara-hammer', job:'Edebiyat Öğretmeni' },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'rebecca-jones', job:'Matematik Öğretmeni' },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'jason-roy', job:'Kimya Öğretmeni' },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'katherine-roy', job:'Tarih Öğretmeni' },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'itav-roy', job:'Fizik Öğretmeni' },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'john-roy', job:'Biyoloji Öğretmeni' },
    ]

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <div className='teacher-profile-page-container'>
                <Container>
                    <div className="profile-container">
                        <div className="personal-info-container">
                            <div className="image-container">
                                <img src={user.image} alt="teacher"/>
                            </div>
                            <div className="name-container mt-3">
                                <p className='name'>{user.firstName} {user.lastName} <span className={`ml-2 status status-${user.status}`}></span></p>
                                <p className='job mt-2'>
                                    <span className='mr-2 sub-text'>{user.job}</span>
                                    <small>
                                        {Array(5)
                                            .fill('')
                                            .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={i+1 <= user.rate ? 'yellow.400' : 'gray.300'}
                                            />
                                        ))}
                                    </small>    
                                </p>
                            </div>
                            <div className="numeric-info-container mt-3">
                                <div className='item'>
                                    <p className='item-number text'>{user.totalLesson}</p>
                                    <p className='item-text sub-text'>DERS</p>
                                </div>
                                <div className='item'>
                                    <p className='item-number text'>{user.totalComment}</p>
                                    <p className='item-text sub-text'>YORUM</p>
                                </div>
                                <div className='item'>
                                    <p className='item-number text'>{user.lessonPrice} TL</p>
                                    <p className='item-text sub-text'>ÜCRET</p>
                                </div>
                            </div>
                            <div className="button-container mt-3">
                                <MessageModal />
                                <TakeLessonModal lessons={user.lessons} lessonPrice={user.lessonPrice} />
                            </div>
                            <div className="about-container mt-3">
                                <p className='sub-text'>{user.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className='profile-other-container row m-0'>
                        <div className="student-comments-container">
                            <p className='comments-title text-center my-4'>Öğrenci Yorumları</p>
                            <div className="student-comments">
                                {
                                    comments.length > 0 ? 
                                    <div>
                                        {
                                            comments.map((item : any, index : number)=>(
                                                <CommentDetail image={item.image} name={item.name} content={item.content} date={item.date} key={index} />
                                            ))
                                        }
                                        <Button text='Daha fazla yükle' className='col-lg-5 col-md-8 col-12 mx-auto px-0 load-more-button' size='sm' />
                                    </div> :
                                    <p className='text text-center'>Henüz yorum yapılmamış.</p>
                                }
                            </div>
                        </div>
                        <div className="similar-instructors mb-4">
                            <p className='similar-title text-center my-4'>Benzer Eğitmenler</p>
                            <div className="instructors-container p-2">
                                {
                                    instructors.map((item, index)=>
                                    <div className='instructor' key={index}>
                                        <div className="image-container">
                                            <img src={item.image} alt="instructor"/>
                                        </div>
                                        <div className="text-container">
                                            <Link className='sub-text' to={`/instructor/${item.slug}`}>{item.name}</Link>
                                            <small>{item.job}</small>
                                        </div>
                                    </div>)
                                }
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