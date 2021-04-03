import React, { FC } from 'react';
import './index.scss';
import { useHistory, Link } from 'react-router-dom';
import { Button } from '../';
import { AiOutlineArrowRight } from 'react-icons/ai';

interface IDefaultProps{
    className: string,
    image: string,
    name: string,
    job: string,
    to: string
    rate: number,
    price: number,
    totalLesson: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, image, name, job, to, rate, price, totalLesson } = props;
    const history = useHistory();

    return (
        <div className={`${className} teacher-filter-card-container`}>
            <div className='teacher-card' onClick={()=>history.push(to)}>
                <div className='image-container'>
                    <img src={image} alt='teacher'/>
                </div>
                <div className='info-container'>
                    <div className='text-container'>
                        <p className='name'>{name}</p>
                        <small className='job text-muted'>{job}</small>
                    </div>
                    <div className='numeric-container'>
                        <div className='items'>
                            <p>{totalLesson}</p>
                            <p>Ders</p>
                        </div>
                        <div className='items'>
                            <p>{rate}</p>
                            <p>Puan</p>
                        </div>
                        <div className='items'>
                            <p>{price} TL</p>
                            <p>Ücret</p>
                        </div>
                    </div>
                    <Button as={Link} to={`/teacher/${name}`} text='Profil' size='sm' rightIcon={<AiOutlineArrowRight />} className='detail-button d-sm-block d-none text-right' />
                </div>
            </div>
        </div>
    );
};

export default Index;

/*

import React, { FC } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';

interface IDefaultProps{
    className: string,
    image: string,
    name: string,
    job: string,
    to: string
    rate: number,
    price: number,
    totalLesson: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, image, name, job, to, rate, price, totalLesson } = props;
    const history = useHistory();

    return (
        <div className={`${className} teacher-filter-card-container`}>
            <div className='teacher-card' onClick={()=>history.push(to)}>
                <div className='image-container'>
                    <img src={image} alt='teacher'/>
                    <div className='name text-center'>
                        <p>{name}</p>    
                        <small>{job}</small>    
                    </div>                    
                </div>
                <div className='information-container'>
                    <div className='item'>
                        <p>{totalLesson}</p>
                        <p className='text-muted sub-text'>Ders</p>
                    </div>
                    <div className='item'>
                        <p>{rate}</p>
                        <p className='text-muted sub-text'>Puan</p>
                    </div>
                    <div className='item'>
                        <p>{price} ₺</p>
                        <p className='text-muted sub-text'>Ücret</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;

*/