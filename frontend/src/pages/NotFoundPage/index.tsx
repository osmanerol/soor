import React, { useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import notfound from '../../assets/images/not-found.svg';

const Index = () => {

    useEffect(() => {
        document.title = 'Soor - Sayfa bulunamadı'
    }, [])

    return (
        <div className='not-found-page-container'>
            <div className="error-detail text-center">
                <img src={notfound} alt='not-found' />
                <p className='text my-3'>Aradığınız sayfa bulunamadı.</p>
                <Button text='Anasayfaya dön' size='sm' className='error-button' as={Link} to='/' />
            </div>
        </div>
    );
};

export default Index;