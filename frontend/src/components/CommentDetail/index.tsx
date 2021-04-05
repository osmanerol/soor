import React, { FC } from 'react';
import './index.scss';

interface IDefaultProps{
    className: string,
    image: string,
    name: string,
    content: string,
    date: any
}

const Index : FC<IDefaultProps>= (props : IDefaultProps) => {
    const { className, image, name, content, date } = props;

    return (
        <div className={`${className} comment-detail-container`}>
            <div className="image-container">
                <img src={image} alt="student"/>
            </div>
            <div className="content-container py-3 px-3">
                <p className='name mb-1'>{name}</p>
                <p className='content mb-1'>{content}</p>
                <div className="text-right">
                    <small className='text-muted'>{date}</small>
                </div>
            </div>
        </div>
    );
};
export default Index;