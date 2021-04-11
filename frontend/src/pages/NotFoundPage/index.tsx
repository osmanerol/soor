import React from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

const Index = () => {
    return (
        <div className='not-found-page-container'>
            <Container>
                <div className="error-detail text-center">
                    <h1 className='error-title'>404</h1>
                    <p className='mb-3'>Aradığınız sayfa bulunamadı.</p>
                    <Button text='Anasayfaya dön' className='error-button' as={Link} to='/' />
                </div>
            </Container>
        </div>
    );
};

export default Index;