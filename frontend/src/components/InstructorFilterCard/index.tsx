import React, { FC } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';

interface IDefaultProps{
    image: string,
    rate: number,
    name: string,
    job: string,
    slug: string,
    price: number,
    totalLesson: number,
    comment: number,
    status: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, name, job, slug, rate, price, totalLesson, comment, status } = props;
    const history = useHistory();

    return (
        <div className='instructor-filter-card' onClick={()=>history.push(slug)}>
            <span className={`status status-${status}`}></span>
            <div className="image-container">
                <img src={image} alt="profile"/>
            </div>
            <div className="name-container">
                <p className='name text'>{name}</p>
                <small className='job'>{job}</small>
                <small className='rate'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                        <StarIcon
                            key={i}
                            color={i+1 <= rate ? 'yellow.400' : 'gray.300'}
                        />
                    ))}
                </small>
            </div>
            <div className="numeric-info-container">
                <div className='item'>
                    <p className='item-number sub-text'>{totalLesson}</p>
                    <p className='item-text sub-text'>Ders</p>
                </div>
                <div className='item'>
                    <p className='item-number sub-text'>{comment}</p>
                    <p className='item-text sub-text'>Yorum</p>
                </div>
                <div className='item'>
                    <p className='item-number sub-text'>{price} TL</p>
                    <p className='item-text sub-text'>Ücret</p>
                </div>
            </div>
        </div>
    );
};

export default Index;