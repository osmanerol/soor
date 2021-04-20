import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container, Pagination } from 'react-bootstrap';
import { InstructorFilterCard, Button, Select, Footer, Input } from '../../components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { categoriesArray, lessonsArray } from '../../assets/datas';

const Index = () => {
    let instructorList = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/instructor/justin-hammer', job:'Matematik Öğretmeni', rate:4.1, comment: 11, price: 80, totalLesson: 22, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/instructor/jessica-jones', job:'Matematik Öğretmeni', rate:4.4, comment: 10, price: 80, totalLesson: 22, status: 0 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/instructor/barbara-hammer', job:'Matematik Öğretmeni', rate:5, comment: 20, price: 100, totalLesson: 43, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'/instructor/rebecca-jones', job:'Matematik Öğretmeni', rate:4.2, comment: 33, price: 80, totalLesson: 24, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'/instructor/jason-roy', job:'Matematik Öğretmeni', rate:4, comment: 11, price: 80, totalLesson: 25, status: 2 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'/instructor/katherine-roy', job:'Matematik Öğretmeni', rate:5, comment: 12, price: 80, totalLesson: 26, status: 0 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'/instructor/itav-roy', job:'Matematik Öğretmeni', rate:4.5, comment: 14, price: 100, totalLesson: 21, status: 0 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'/instructor/john-roy', job:'Matematik Öğretmeni', rate:4, comment: 13, price: 80, totalLesson: 21, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'/instructor/natasha-john', job:'Matematik Öğretmeni', rate:5, comment: 41, price: 80, totalLesson: 30, status: 2 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/instructor/justin-hammer', job:'Matematik Öğretmeni', rate:4.1, comment: 11, price: 80, totalLesson: 22, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/instructor/jessica-jones', job:'Matematik Öğretmeni', rate:4.4, comment: 10, price: 80, totalLesson: 22, status: 0 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/instructor/barbara-hammer', job:'Matematik Öğretmeni', rate:5, comment: 20, price: 100, totalLesson: 43, status: 1 },
    ];
    const [instructors, setInstructors] = useState<any>(instructorList);
    const [selectedCategory, setSelectedCategory] = useState<number>(-1);
    const [selectedLesson, setSelectedLesson] = useState<number>(-1);
    const { control } = useForm();
    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
        setSelectedCategory(-1);
    },[])

    const filterInstructors=(statusCode : number)=>{
        setInstructors(instructorList.filter((item : any) => item.status === statusCode));
    }

    const clickFilter=()=>{
        if(selectedCategory !== -1 && selectedLesson !== -1){

        }
    }

    return (
        <>
            <div className='lesson-filter-page-container'>
                <Container>
                    <div className="lesson-filter">
                        <form className="filter-container mt-3">
                            <p className='sub-title'>Dersleri Filtrele</p>
                            <Input placeholder='İsme göre ara' size='sm' />
                            <Select datas={categoriesArray} size='sm' placeholder='Eğitim Durumu' onChange={(event: any)=>setSelectedCategory(parseInt(event.target.value))} id='id' value='value' control={control}/>
                            <Select datas={lessonsArray.filter(item=> item.categoryId === selectedCategory)} size='sm'  placeholder='Ders' onChange={(event: any)=>setSelectedLesson(parseInt(event.target.value))} id='id' value='value' control={control} />
                            <Button text='Ara' size='sm' className='my-2' as={Link} to='/lesson-filter/matematik' onClick={clickFilter} />
                        </form>
                        <div className="content-container mt-3">
                            <p className='sub-title'>'Matematik' dersi için sonuçlar</p>
                            <div className='status-container my-2'>
                                <div className='item' onClick={()=>filterInstructors(1)}>
                                    <span className='status status-1'></span>
                                    <small>Çevrimiçi</small>
                                </div>
                                <div className='item' onClick={()=>filterInstructors(2)}>
                                    <span className='status status-2'></span>
                                    <small>Derste</small>
                                </div>
                                <div className='item' onClick={()=>filterInstructors(0)}>
                                    <span className='status status-0'></span>
                                    <small>Çevrimdışı</small>
                                </div>
                            </div>
                            <div className="instructors">
                                {
                                    instructors.map((item : any, index : number)=>(
                                        <InstructorFilterCard key={index} image={item.image} name={item.name} slug={item.slug} job={item.job} rate={item.rate} price={item.price} comment={item.comment} totalLesson={item.totalLesson} status={item.status} />
                                    ))
                                }
                            </div>
                            <small className='pagination-container mb-3'>
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
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;
/*
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Filter, InstructorFilterCard, Button, Footer } from '../../components';
import { Heading } from '@chakra-ui/react';

const Index = () => {
    let instructorList = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/instructor/justin-hammer', job:'Matematik Öğretmeni', rate:4.1, comment: 11, price: 80, totalLesson: 22, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/instructor/jessica-jones', job:'Matematik Öğretmeni', rate:4.4, comment: 10, price: 80, totalLesson: 22, status: 0 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/instructor/barbara-hammer', job:'Matematik Öğretmeni', rate:5, comment: 20, price: 100, totalLesson: 43, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'/instructor/rebecca-jones', job:'Matematik Öğretmeni', rate:4.2, comment: 33, price: 80, totalLesson: 24, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'/instructor/jason-roy', job:'Matematik Öğretmeni', rate:4, comment: 11, price: 80, totalLesson: 25, status: 2 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'/instructor/katherine-roy', job:'Matematik Öğretmeni', rate:5, comment: 12, price: 80, totalLesson: 26, status: 0 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'/instructor/itav-roy', job:'Matematik Öğretmeni', rate:4.5, comment: 14, price: 100, totalLesson: 21, status: 0 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'/instructor/john-roy', job:'Matematik Öğretmeni', rate:4, comment: 13, price: 80, totalLesson: 21, status: 1 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'/instructor/natasha-john', job:'Matematik Öğretmeni', rate:5, comment: 41, price: 80, totalLesson: 30, status: 2 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', slug:'/instructor/victoria-john', job:'Matematik Öğretmeni', rate:5, comment: 11, price: 100, totalLesson:21, status: 1 }
    ];
    const [instructors, setInstructors] = useState<any>(instructorList);

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    },[])

    const filterInstructors=(statusCode : number)=>{
        setInstructors(instructorList.filter((item : any) => item.status === statusCode));
    }

    return (
        <>
            <div className='lesson-filter-page-container'>
                <Filter />
                <Container>
                    {
                        instructorList.length > 100 &&
                        <div className='teachers-container pt-4'>
                            <Heading as='h4' size='md'>'Matematik' dersi için sonuçlar</Heading>
                            <div className='status-container my-3'>
                                <div className='item' onClick={()=>filterInstructors(1)}>
                                    <span className='status status-1'></span>
                                    <small>Çevrimiçi</small>
                                </div>
                                <div className='item' onClick={()=>filterInstructors(2)}>
                                    <span className='status status-2'></span>
                                    <small>Derste</small>
                                </div>
                                <div className='item' onClick={()=>filterInstructors(0)}>
                                    <span className='status status-0'></span>
                                    <small>Çevrimdışı</small>
                                </div>
                            </div>
                            <div className='instructors-list mt-2'>
                                {
                                    instructors.map((item : any, index : number)=>(
                                        <InstructorFilterCard key={index} image={item.image} name={item.name} slug={item.slug} job={item.job} rate={item.rate} price={item.price} comment={item.comment} totalLesson={item.totalLesson} status={item.status} />
                                    ))
                                }
                            </div>
                            <Button text='Daha fazla yükle' className='col-md-5 col-sm-8 col-12 mx-auto p-0 mx-0 mt-2 mb-4 load-more-instructor-button' size='sm'  />
                        </div> 
                    }
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;
*/