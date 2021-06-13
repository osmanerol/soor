import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Footer } from '../../components';

const Index = () => {
    
    useEffect(()=>{
        document.title = 'Soor - Hakkımızda';
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <Container className='about-page-container pb-4'>
                <h2 className='title text-center py-4'>Hakkımızda</h2>
                <p className='text pb-3'>Yazı gelecek.</p> 
            </Container>
            <Footer />
        </>
    );
};

export default Index;