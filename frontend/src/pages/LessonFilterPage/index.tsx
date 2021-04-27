import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { Container, Pagination } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import { InstructorFilterCard, Empty, Button, Select, Spinner, Footer, Loading, Input } from '../../components';
import { useForm } from 'react-hook-form';
import { categoriesArray } from '../../assets/datas';
import LectureStore from '../../application/lecture/store/lectureStore';

interface IDefaultProps{
    LectureStore? : typeof LectureStore,
}

const Index : FC<IDefaultProps> = inject('LectureStore')(observer((props : IDefaultProps) => {
    const { LectureStore : store } = props;
    const [searchPage, setSearchPage] = useState(1);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedLecture, setSelectedLecture] = useState<any>(null);
    const [selectedLectureName, setSelectedLectureName] = useState<string>('');
    const { control } = useForm();
    
    useEffect(()=>{
        if(store!.lectureList.count === 0){
            store?.getAllLectures();
        }
        store!.getInstructor({ name: null, lecture_id: null, page: null});
        window.scrollTo(0,0);
        setSelectedCategory(-1);
    },[store])

    const filterStatus=(statusCode : boolean)=>{
        store!.instructorList.results! = store!.instructorList.results!.filter((item : any) => item.status === statusCode)
    }

    const clickFilter=(page : any = null)=>{
        setSearchPage(page);
        window.scrollTo(0,0);
        setSelectedCategory(null);
        setSearchText('');
        setSelectedLecture(null);
        if(selectedLecture){
            setSelectedLectureName(store!.lectureList.results.find(item=> item.id === selectedLecture)!.name)
        }
        store?.getInstructor({ name : searchText, lecture_id : selectedLecture, page : page});
    }

    return (
        <>
            {
                (store?.lectureList.isLoading) ?
                <Loading />:
                <>
                    <div className='lesson-filter-page-container'>
                        <Container>
                            <div className="lesson-filter">
                                <form className="filter-container mt-3">
                                    <p className='sub-title'>Eğitmen Filtrele</p>
                                    <Input placeholder='Ad Soyad' size='sm' value={searchText} onChange={(event: any)=>setSearchText(event.target.value)} />
                                    <Select datas={categoriesArray} size='sm' placeholder='Eğitim Durumu' onChange={(event: any)=>setSelectedCategory(parseInt(event.target.value))} id='id' value='name' control={control}/>
                                    <Select datas={store!.lectureList.results.filter(item=> item.category === selectedCategory)} size='sm' placeholder='Ders' onChange={(event: any)=>setSelectedLecture(parseInt(event.target.value))} id='id' value='name' control={control} />
                                    <Button text='Ara' size='sm' className='my-2' onClick={()=>clickFilter(1)} disabled={(selectedLecture === null) && searchText === ''} />
                                </form>
                                <div className="content-container mt-3">
                                    {
                                        store!.instructorList!.is_loading ?
                                        <div className="spinner-container">
                                            <Spinner />
                                        </div>  :
                                        store!.instructorList!.results?.length === 0 ?
                                        <Empty text='Eğitmen bulunamadı.' showButton={false} /> :
                                        <>
                                            <p className='sub-title'>
                                                {
                                                    selectedLectureName === '' ? 'Sonuçlar' : `'${selectedLectureName}' dersi için sonuçlar` 
                                                }
                                            </p>
                                            {
                                                store!.instructorList.results!.length > 0 &&
                                                <div className='status-container my-2'>
                                                    <div className='item' onClick={()=>filterStatus(true)}>
                                                        <span className='status status-1'></span>
                                                        <small>Çevrimiçi</small>
                                                    </div>
                                                    <div className='item' onClick={()=>filterStatus(false)}>
                                                        <span className='status status-0'></span>
                                                        <small>Çevrimdışı</small>
                                                    </div>
                                                </div>
                                            }
                                            <div className="instructors">
                                                {
                                                    store!.instructorList.results!.map((item : any, index : number)=>(
                                                        <InstructorFilterCard key={index} image={item.instructor.image} first_name={item.first_name} last_name={item.last_name} slug={item.instructor.slug} job={item.instructor.job} rate={item.instructor.rate} price={item.instructor.lessonPrice} comment={item.instructor.totalComment} totalLesson={item.instructor.totalLesson} status={item.instructor.status} />
                                                    ))
                                                }
                                            </div>
                                            {
                                                (store!.instructorList.next || store!.instructorList.previous) &&
                                                <small className='pagination-container mb-3'>
                                                    <Pagination>
                                                        <Pagination.First onClick={()=>clickFilter(1)} />
                                                        <Pagination.Prev onClick={()=>clickFilter(searchPage > 1 ? searchPage-1 : 1)} />
                                                        <Pagination.Ellipsis disabled />
                                                        { /*
                                                            [...Array(parseInt((store!.instructorList.count/12).toString())+1)].map((item, index)=>
                                                                <Pagination.Item key={index} onClick={()=>clickFilter(index+1)}>{index+1}</Pagination.Item>
                                                            )
                                                            */
                                                        }
                                                        <Pagination.Item onClick={()=>clickFilter(searchPage)}>{searchPage}</Pagination.Item>
                                                        <Pagination.Ellipsis disabled />
                                                        <Pagination.Next onClick={()=>clickFilter(searchPage > 0 ? searchPage+1 : 1)}  />
                                                        <Pagination.Last onClick={()=>clickFilter(parseInt((store!.instructorList.count/12).toString())+1)}  />
                                                    </Pagination>
                                                </small>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>
                    <Footer />
                </>
            }
        </>
    );
}));

export default Index;
/*

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
*/