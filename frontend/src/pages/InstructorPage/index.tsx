import React, { useEffect } from 'react';
import './index.scss';
import { Button, TakeLessonModal, CommentDetail, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import { StarIcon } from '@chakra-ui/icons';
import { FiMessageSquare } from 'react-icons/fi';

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
    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                                <Button text='Mesaj at' leftIcon={<FiMessageSquare />} size='sm' className='send-message-button text' />
                                <TakeLessonModal lessons={user.lessons} lessonPrice={user.lessonPrice} />
                            </div>
                            <div className="about-container mt-3">
                                <p className='sub-text'>{user.about}</p>
                            </div>
                        </div>
                    </div>
                    <div className="student-comments-container mb-4">
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
                                    <Button text='Daha fazla yükle' className='col-lg-5 col-md-8 col-12 mx-auto px-0 my-2 load-more-button' size='sm' />
                                </div> :
                                <p className='text'>Henüz yorum yapılmamış.</p>
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;