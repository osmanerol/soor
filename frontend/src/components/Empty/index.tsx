import React, { FC } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import empty from '../../assets/images/empty.svg';

interface IDefaultProps{
    text: string
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { text } = props;

    return (
        <div className='empty-page-container'>
            <div className="detail text-center">
                <img src={empty} alt='empty' />
                <p className='text my-3'>{text}</p>
                <Button text='Anasayfaya dön' size='sm' as={Link} to='/' />
            </div>
        </div>
    );
};

export default Index;