import React, { FC, useEffect, useState, useRef } from 'react';
import './index.scss';
import { Container, Pagination } from 'react-bootstrap';
import { observer, inject } from 'mobx-react';
import { InstructorFilterCard, Empty, Button, Select, Spinner, Footer, Input } from '../../components';
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
    const searchStatus = useRef<any>(null);
    const { control } = useForm();
    
    useEffect(()=>{
        document.title = 'Soor - Ders Seç'
        window.scrollTo(0,0);
    })

    useEffect(()=>{
        if(store!.lectureList.count === 0){
            store?.getAllLectures();
        }
        store!.getInstructor({ name : null, lecture_id : null, page : null, status : null});
        setSelectedCategory(-1);
    },[store])

    const clickFilter=(page : any = null)=>{
        setSearchPage(page);
        window.scrollTo(0,0);
        if(selectedLecture){
            setSelectedLectureName(store!.lectureList.results.find(item=> item.id === selectedLecture)!.name)
        }
        store?.getInstructor({ name : searchText, lecture_id : selectedLecture, page : page, status : searchStatus.current});
    }

    return (
        <>
            <div className='lesson-filter-page-container'>
                <div className='filter-container'>
                    <Container>
                        <p className='sub-title'>Eğitmen Filtrele</p>
                        <form>
                            {
                                store!.lectureList.isLoading ?
                                <Spinner />:
                                <>
                                    <Input placeholder='Ad Soyad' size='sm' value={searchText} onChange={(event: any)=>setSearchText(event.target.value)} />
                                    <Select datas={categoriesArray} size='sm' placeholder='Eğitim Durumu' onChange={(event: any)=>setSelectedCategory(parseInt(event.target.value))} id='id' value='name' control={control}/>
                                    <Select datas={store!.lectureList.results.filter(item=> item.category === selectedCategory)} size='sm' placeholder='Ders' onChange={(event: any)=>setSelectedLecture(parseInt(event.target.value))} id='id' value='name' control={control} />
                                    <Button text='Ara' size='sm' onClick={()=>clickFilter(1)} />
                                </>
                            }
                        </form>
                    </Container>
                </div>
                <Container>
                    <div className="content-container">
                        <p className='sub-title'>
                            {
                                selectedLectureName === '' ? 'Sonuçlar' : `'${selectedLectureName}' dersi için sonuçlar` 
                            }
                        </p>
                        <div className='status-container mt-2 mb-3'>
                            <div className='item' onClick={()=>{ searchStatus.current = 1; clickFilter(); }}>
                                <span className='status status-1'></span>
                                <small>Çevrimiçi</small>
                            </div>
                            <div className='item' onClick={()=>{ searchStatus.current = 2; clickFilter(); }}>
                                <span className='status status-2'></span>
                                <small>Derste</small>
                            </div>
                            <div className='item' onClick={()=>{ searchStatus.current = 0; clickFilter(); }}>
                                <span className='status status-0'></span>
                                <small>Çevrimdışı</small>
                            </div>
                        </div>
                        {
                            store!.instructorList!.isLoading ?
                            <Spinner /> :
                            store!.instructorList!.results!.length === 0 ?
                            <Empty text='Eğitmen bulunamadı.' showButton={false} /> :
                            <div className="instructors">
                                {
                                    store!.instructorList.results!.map((item : any, index : number)=>(
                                        <InstructorFilterCard key={index} image={item.instructor.image} first_name={item.first_name} last_name={item.last_name} slug={item.instructor.slug} job={item.instructor.job} rate={item.instructor.rate} price={item.instructor.lessonPrice} comment={item.instructor.totalComment} totalLesson={item.instructor.totalLesson} status={item.instructor.status} />
                                    ))
                                }
                            </div>
                        }
                        {
                            (!store!.instructorList.isLoading && (store!.instructorList.next || store!.instructorList.previous) && store!.instructorList.results!.length > 0) &&
                            <small className='pagination-container mt-3'>
                                <Pagination>
                                    <Pagination.First onClick={()=>clickFilter(1)} />
                                    <Pagination.Prev onClick={()=>clickFilter(searchPage > 1 ? searchPage-1 : 1)} />
                                    <Pagination.Item onClick={()=>clickFilter(searchPage)}>{searchPage}</Pagination.Item>
                                    <Pagination.Next onClick={()=>clickFilter(searchPage === store!.instructorList.count ? searchPage : searchPage+1)}  />
                                    <Pagination.Last onClick={()=>clickFilter(parseInt((store!.instructorList.count/12).toString())+1)}  />
                                </Pagination>
                            </small>
                        }
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}));

export default Index;   