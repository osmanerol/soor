import React, { FC, useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import { InstructorCard, Button, Comment, Spinner } from '../../components';
import { Link } from 'react-router-dom';
import expected1 from '../../assets/images/expected-1.jpg';
import expected2 from '../../assets/images/expected-2.jpg';
import expected3 from '../../assets/images/expected-3.jpg';
import GeneralStore from '../../application/general/store/generalStore';

interface IDefaultProps {
    GeneralStore? : typeof GeneralStore
}

const Index : FC<IDefaultProps> = inject('GeneralStore')(observer((props : IDefaultProps) => {
    const { GeneralStore : store } = props;

    const studentComments = [
        { image : 'https://images.unsplash.com/photo-1557555187-23d685287bc3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Harvey Specter', content: 'This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
        { image : 'https://images.unsplash.com/photo-1614940873537-487b4741dbaa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' , name: 'Christian Wayne', content: '  This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders', rate: 5},
        { image : 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg' , name: 'Valary Specter', content: ' This is a truly spectacular theme! The custom page builder is definitely one of the most intuitive and user-friendly page builders.', rate: 4},
    ]

    useEffect(()=>{
        const getLastInstructor = async () => {
            if(store!.instructorList.results!.length === 0){
                store!.getLastInstructor();
            }
        }
        const getTotalData = async () => {
            if(store!.totalData.total_instructor === 0){
                store!.getTotalData();
            }
        }
        getLastInstructor();
        getTotalData();
    }, [store])

    useEffect(()=>{
        document.title = 'Soor - Anasayfa';
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='homepage-container'>
            <div className="cover">
                <Container>
                    <div className="col-lg-7 col-md-9 col-sm-10 col-12 content">
                        <p className='cover-title'>Yüzlerce Çevrimiçi Eğitmene Sorularını SOOR</p>
                        <p className='cover-text'>Alanında uzman eğitmenler, çözemediğin sorulara yardımcı olmak için seni bekliyor. Zaman kaybetmeden giriş yap ve sorularını eğitmenlere sor.</p>
                        <div className="button-container">
                            {
                                localStorage.getItem('token') ? 
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
                                <p className='sub-text'>Çözemediğin sorulara yardımcı olmak için alanında uzman eğitmenler seni bekliyor .</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image-container">
                                <img src={expected2} alt="item"/>
                            </div>
                            <div className="text-container text-center">
                                <h2 className='sub-title text-center mb-3'>Canlı Ders</h2>
                                <p className='sub-text'>Soru sormak dışında süreyi uzatarak eğitmenden konu anlatmasını da isteyebilirsin.</p>
                            </div>
                        </div>
                        <div className="item text-center">
                            <div className="image-container">
                                <img src={expected3} alt="item"/>
                            </div>
                            <div className="text-container text-center">
                                <h2 className='sub-title text-center mb-3'>Danışmanlık</h2>
                                <p className='sub-text'>Tercih ve akademik danışma konusunda yardım alabileceğin eğitmenler de SOOR'da.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="instructors-container">
                    <h2 className='title text-center'>SOOR'da ders veren eğitmenlerden bazıları :</h2>
                    <div className="instructor-list">
                        {
                            store!.instructorList.isLoading ?
                            <>
                            <Spinner /> 
                            </>:
                            store!.instructorList.results!.map((item : any, index : number)=>(
                                <InstructorCard key={index} image={item.instructor.image} first_name={item.first_name} last_name={item.last_name} job={item.instructor.job} rate={item.instructor.rate} slug={item.instructor.slug} />
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
                            {
                                store!.totalData.isLoading ?
                                <Spinner /> :
                                <div className="items">
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_student}</span>
                                        <span className='sub-title'>Öğrenci</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_instructor}</span>
                                        <span className='sub-title'>Eğitmen</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_lesson}</span>
                                        <span className='sub-title'>Canlı Ders</span>
                                    </div>
                                </div>
                            }
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
    );
})) ;

export default Index;