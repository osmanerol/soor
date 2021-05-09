import React, { FC, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Button, TakeLessonModal, Empty, Spinner, CommentDetail, Footer } from '../../components';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import DefaultProfile from '../../assets/images/defaultProfile.png';
import InstructorStore from '../../application/instructor/store/instructorStore';
import CommentStore from '../../application/comment/store/commentStore';
import StudentStore from '../../application/student/store/studentStore';
import GeneralStore from '../../application/general/store/generalStore';

interface IDefaultProps{
    InstructorStore : typeof InstructorStore;
    CommentStore : typeof CommentStore;
    StudentStore : typeof StudentStore;
    GeneralStore : typeof GeneralStore;
}

const Index : FC<IDefaultProps> = inject('InstructorStore', 'CommentStore', 'StudentStore', 'GeneralStore')(observer((props : IDefaultProps) => {
    const { InstructorStore : store, CommentStore : commentStore, StudentStore : studentStore, GeneralStore : generalStore } = props;
    let { slug } = useParams<{ slug : string }>();

    useEffect(()=>{
        document.title = 'Soor - Eğitmen';
        window.scrollTo(0,0);
    }, [])

    useEffect(()=>{
        commentStore.pageNumber = 1;
        store!.getInstructor(slug);
        commentStore!.clearCommentList();
        commentStore!.getComments(slug);
        if(generalStore!.instructorList.results?.length === 0){
            generalStore!.getLastInstructor();
        }
    }, [store, commentStore, generalStore, studentStore, slug])

    const loadMoreComment = async () =>{
        commentStore.getComments(slug);
    }

    return (
        <>
            {
                store!.isLoading ? 
                <div className='teacher-profile-page-container'>
                    <Spinner />
                </div> : 
                store!.error ?
                <div className='teacher-profile-page-container'>
                    <Empty text='Eğitmen bulunamadı' showButton={false} /> 
                </div>:
                <div className='teacher-profile-page-container'>
                    <Container>
                        <div className="profile-container">
                            <div className="personal-info-container">
                                <div className="image-container">
                                    <img src={store!.instructorProfile.instructor.image ? store!.instructorProfile.instructor.image : DefaultProfile} alt="teacher"/>
                                </div>
                                <div className="name-container mt-3">
                                    <p className='name'>{store!.instructorProfile.first_name} {store!.instructorProfile.last_name} <span className={`ml-2 status status-${store!.instructorProfile.instructor.status}`}></span></p>
                                    <p className='job mt-2'>
                                        <span className='mr-2 sub-text'>{store!.instructorProfile.instructor.job}</span>
                                        <small>
                                            {Array(5)
                                                .fill('')
                                                .map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={i+1 <= store!.instructorProfile.instructor.rate ? 'yellow.400' : 'gray.300'}
                                                />
                                            ))}
                                        </small>    
                                    </p>
                                </div>
                                <div className="numeric-info-container mt-3">
                                    <div className='item'>
                                        <p className='item-number text'>{store!.instructorProfile.instructor.totalLesson}</p>
                                        <p className='item-text sub-text'>DERS</p>
                                    </div>
                                    <div className='item'>
                                        <p className='item-number text'>{store!.instructorProfile.instructor.totalComment}</p>
                                        <p className='item-text sub-text'>YORUM</p>
                                    </div>
                                    <div className='item'>
                                        <p className='item-number text'>{store!.instructorProfile.instructor.lessonPrice} TL</p>
                                        <p className='item-text sub-text'>ÜCRET</p>
                                    </div>
                                </div>
                                {
                                    localStorage.getItem('userType') === '1' &&
                                    <div className="button-container mt-3">
                                        <TakeLessonModal lessons={store!.instructorProfile.instructor.lectures} lessonPrice={store!.instructorProfile.instructor.lessonPrice} credit={studentStore.student.student.credit} disabled={store.instructorProfile.instructor.status !== 1} />
                                    </div>
                                }
                                <div className="about-container mt-3">
                                    <p className='sub-text'>{store!.instructorProfile.instructor.about}</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-other-container row m-0'>
                            <div className="student-comments-container">
                                <p className='comments-title text-center my-4'>Öğrenci Yorumları</p>
                                <div className="student-comments">
                                    {
                                        commentStore!.commentList.results!.length > 0 ? 
                                        <div>
                                            {
                                                commentStore!.commentList.results!.map((item : any, index : number)=>(
                                                    <CommentDetail image={item.student.image} name={`${item.student.first_name} ${item.student.last_name}`} content={item.content} date={item.created} key={index} />
                                                ))
                                            }
                                            {
                                                commentStore.commentList.next &&
                                                <Button text='Daha fazla yükle' className='col-lg-5 col-md-8 col-12 mx-auto px-0 load-more-button' isLoading={commentStore.commentList.isLoading} size='sm' onClick={loadMoreComment} />
                                            }
                                        </div> :
                                        <Empty text='Henüz yorum yapılmamış.' showButton={false} />
                                    }
                                </div>
                            </div>
                            <div className="similar-instructors mb-4">
                                <p className='similar-title text-center my-4'>Eğitmenler</p>
                                <div className="instructors-container">
                                    {
                                        generalStore!.instructorList.isLoading ? 
                                        <Spinner /> :
                                        generalStore!.instructorList.results!.length > 0 &&
                                        <div>
                                            {
                                                generalStore!.instructorList.results!.slice(0, 5).map((item : any, index : number)=>(
                                                    <div className='instructor' key={index}>
                                                        <div className="image-container">
                                                            <img src={(item.instructor.image === '' || item.instructor.image === null) ? DefaultProfile : item.instructor.image} alt="instructor"/>
                                                        </div>
                                                        <div className="text-container">
                                                            <Link className='sub-text' to={`/instructor/${item.instructor.slug}`}>{item.first_name} {item.last_name}</Link>
                                                            <small>{item.instructor.job}</small>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            }
            <Footer />
        </>
    );
}));

export default Index;