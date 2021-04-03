import React, { FC, useState, useEffect} from 'react';
import './index.scss';
import { categoriesArray, lessonsArray } from '../../assets/datas';
import { Select, Button } from '../../components';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import homepage from '../../assets/images/homepage.svg';    

interface IDefaultProps{
    hideImage?: string
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { hideImage } = props;
    const [selectedCategory, setSelectedCategory] = useState<number>(-1);
    const [selectedLesson, setSelectedLesson] = useState<number>(-1);
    const { control } = useForm();
    
    useEffect(()=>{
        setSelectedCategory(-1);
    },[])
    
    const clickFilter=()=>{
        if(selectedCategory !== -1 && selectedLesson !== -1){

        }
    }
    
    return (
        <div className='top-content-container row p-0 m-0'>
            <div className='col-lg-6 col-md-7 col-12 top-filter'>
                <p className='header'>Aradığın dersi seç , yüzlerce çevrimiçi öğretmenlerden seçtiğine canlı olarak sorunu sor.</p>
                <form>
                    <Select datas={categoriesArray} placeholder='Eğitim Durumu' onChange={(event: any)=>setSelectedCategory(parseInt(event.target.value))} id='id' value='value' control={control}/>
                    <Select datas={lessonsArray.filter(item=> item.categoryId === selectedCategory)} placeholder='Ders' onChange={(event: any)=>setSelectedLesson(parseInt(event.target.value))} id='id' value='value' control={control} />
                    <Button text='Ara' className='my-2' as={Link} to='/lesson-filter/matematik' onClick={clickFilter} />
                </form>
            </div>
            <div className={`col-lg-6 col-md-5 col-12 text-center top-image ${hideImage}`}>
                <img src={homepage} alt='homepage'/>
            </div>
        </div>
    );
};

export default Index;