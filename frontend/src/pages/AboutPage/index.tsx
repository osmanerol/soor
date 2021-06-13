import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';

const Index = () => {
    
    useEffect(()=>{
        document.title = 'Soor - Hakkımızda';
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='about-page-container pb-4'>
            <h2 className='title text-center py-4'>Hakkımızda</h2>
            <Container>
                <p className='text my-4'>Yazı gelecek.</p> 
            </Container>
        </div>
    );
};

export default Index;