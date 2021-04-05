import React, { useEffect } from 'react';
import './index.scss';
import { Container, Pagination } from 'react-bootstrap';
import { Filter, TeacherFilterCard, Footer } from '../../components';
import { Heading } from '@chakra-ui/react';

const Index = () => {
    const teachers = [ 
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name:'Justin Hammer', slug:'/teacher/justin-hammer', job:'Matematik Öğretmeni', rate:4.1, price: 80, totalLesson: 22 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name:'Jessica Jones', slug:'/teacher/jessica-jones', job:'Matematik Öğretmeni', rate:4.4, price: 80, totalLesson: 22 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name:'Barbara Hammer', slug:'/teacher/barbara-hammer', job:'Matematik Öğretmeni', rate:5, price: 100, totalLesson: 43 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', name:'Rebecca Hammer', slug:'/teacher/rebecca-jones', job:'Matematik Öğretmeni', rate:4.2, price: 80, totalLesson: 24 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name:'Jason Roy', slug:'/teacher/jason-roy', job:'Matematik Öğretmeni', rate:4, price: 80, totalLesson: 25 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-6.jpg', name:'Katherine Roy', slug:'/teacher/katherine-roy', job:'Matematik Öğretmeni', rate:5, price: 80, totalLesson: 26 },
        { image:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Itav Roy', slug:'/teacher/itav-roy', job:'Matematik Öğretmeni', rate:4.5, price: 100, totalLesson: 21 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name:'John Roy', slug:'/teacher/john-roy', job:'Matematik Öğretmeni', rate:4, price: 80, totalLesson: 21 },
        { image:'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-7.jpg', name:'Natasha John', slug:'/teacher/natasha-john', job:'Matematik Öğretmeni', rate:5, price: 80, totalLesson: 30 },
        { image:'https://images.unsplash.com/photo-1529957713629-c085c35d0ef5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTk0fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name:'Victoria John', slug:'/teacher/victoria-john', job:'Matematik Öğretmeni', rate:5, price: 100, totalLesson:21 }
    ]

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    })

    return (
        <div className='lesson-filter-page-container'>
        <Filter />
           <Container>
                <div className='teachers-container pt-4'>
                    <Heading as='h4' size='md'>'Matematik' dersi için sonuçlar</Heading>
                    <div className='row teachers mt-4'>
                        {
                            teachers.map(item=>(
                                <TeacherFilterCard key={item.image} className='col-md-6 col-12 mx-auto' image={item.image} name={item.name} slug={item.slug} job={item.job} rate={item.rate} price={item.price} totalLesson={item.totalLesson} />
                            ))
                        }
                    </div>
                    <small className='pagination-container mt-1 mb-4'>
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
           </Container>
           <Footer />
        </div>
    );
};

export default Index;