import React, { FC } from 'react';
import './index.scss';
import { useHistory, Link } from 'react-router-dom';
import { Button } from '..';
import { AiOutlineArrowRight } from 'react-icons/ai';

interface IDefaultProps{
    image: string,
    name: string,
    job: string,
    slug: string
    rate: number,
    price: number,
    totalLesson: number,
    status: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, name, job, slug, rate, price, totalLesson, status } = props;
    const history = useHistory();

    return (
        <div className='teacher-filter-card' onClick={()=>history.push(slug)}>
            <div className='image-container'>
                <img src={image} alt='teacher'/>
                <span className={`status status-${status}`}></span>
            </div>
            <div className='info-container'>
                <div className='text-container'>
                    <p className='filter-card-name'>{name}</p>
                    <small className='filter-card-job text-muted'>{job}</small>
                </div>
                <div className='numeric-container'>
                    <div className='item'>
                        <p className='item-number'>{totalLesson}</p>
                        <p className='item-text'>Ders</p>
                    </div>
                    <div className='item'>
                        <p className='item-number'>{rate}</p>
                        <p className='item-text'>Puan</p>
                    </div>
                    <div className='item'>
                        <p className='item-number'>{price} TL</p>
                        <p className='item-text'>Ücret</p>
                    </div>
                </div>
                <Button as={Link} to={`/teacher/${name}`} text='Profil' size='sm' rightIcon={<AiOutlineArrowRight />} className='detail-button d-lg-block d-none text-right' />
            </div>
        </div>
    );
};

export default Index;