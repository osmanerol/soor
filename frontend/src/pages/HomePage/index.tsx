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
                        <p className='cover-title'>Y??zlerce ??evrimi??i E??itmene Sorular??n?? SOOR</p>
                        <p className='cover-text'>Alan??nda uzman e??itmenler, ????zemedi??in sorulara yard??mc?? olmak i??in seni bekliyor. Zaman kaybetmeden giri?? yap ve sorular??n?? e??itmenlere sor.</p>
                        <div className="button-container">
                            {
                                localStorage.getItem('token') ? 
                                <>
                                    <Button text='Ders Se??' className='filter-button' as={Link} to='/lesson-filter' />
                                </> :  
                                <>
                                    <Button text='Giri?? Yap' className='filter-button' as={Link} to='/login' />
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
                                <h2 className='sub-title text-center mb-3'>Soru ????z??m??</h2>
                                <p className='sub-text'>????zemedi??in sorulara yard??mc?? olmak i??in alan??nda uzman e??itmenler seni bekliyor .</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image-container">
                                <img src={expected2} alt="item"/>
                            </div>
                            <div className="text-container text-center">
                                <h2 className='sub-title text-center mb-3'>Canl?? Ders</h2>
                                <p className='sub-text'>Soru sormak d??????nda s??reyi uzatarak e??itmenden konu anlatmas??n?? da isteyebilirsin.</p>
                            </div>
                        </div>
                        <div className="item text-center">
                            <div className="image-container">
                                <img src={expected3} alt="item"/>
                            </div>
                            <div className="text-container text-center">
                                <h2 className='sub-title text-center mb-3'>Dan????manl??k</h2>
                                <p className='sub-text'>Tercih ve akademik dan????ma konusunda yard??m alabilece??in e??itmenler de SOOR'da.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="instructors-container">
                    <h2 className='title text-center'>SOOR'da ders veren e??itmenlerden baz??lar?? :</h2>
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
                            <h2 className="total-datas-title">SOOR olarak her ge??en g??n b??y??meye devam ediyoruz.</h2>
                        </div>
                        <div className="col-md-6 col-12">
                            <p className='total-datas-text title text-center mb-4'>??imdiye kadar toplam : </p>
                            {
                                store!.totalData.isLoading ?
                                <Spinner /> :
                                <div className="items">
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_student}</span>
                                        <span className='sub-title'>????renci</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_instructor}</span>
                                        <span className='sub-title'>E??itmen</span>
                                    </div>
                                    <div className="item">
                                        <span className='title'>{store!.totalData.total_lesson}</span>
                                        <span className='sub-title'>Canl?? Ders</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <div className='students-comments-container'>
                <Container>
                    <h2 className='title text-center'>????renci Yorumlar??</h2>
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