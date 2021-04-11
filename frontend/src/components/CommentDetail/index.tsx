import React, { FC } from 'react';
import './index.scss';

interface IDefaultProps{
    image: string,
    name: string,
    content: string,
    date: any
}

const Index : FC<IDefaultProps>= (props : IDefaultProps) => {
    const { image, name, content, date } = props;

    return (
        <div className='comment-detail-container p-3'>
            <div className='image-container'>
                <img src={image} alt='student'/>
            </div>
            <div className='content-container'>
                <p className='name text mb-1'>{name}</p>
                <p className='content text mb-1'>{content}</p>
                <div className='text-right'>
                    <small className='text-muted'>{date}</small>
                </div>
            </div>
        </div>
    );
};
export default Index;