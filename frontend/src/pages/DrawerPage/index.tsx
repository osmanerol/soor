import React, { useState, FC, useEffect, useRef } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import CanvasDraw from "react-canvas-draw";
import { Button } from '../../components';

const Index = () => {
    const [showEmpty, setShowEmpty] = useState(true);
    const canvas = useRef(null);

    const clearCanvas = () => {
        //canvas.current!.clear();
    }
    
    return (
        <Container className='drawer-page-container'>
            <Button text='Temizle' className='col-md-3 pl-0 py-2' onClick={clearCanvas} />
            <CanvasDraw 
                brushRadius={3}
                brushColor='#444'
                canvasWidth={600}
                canvasHeight={600}
                imgSrc={localStorage.getItem('image') ? "https://firebasestorage.googleapis.com/v0/b/soor-efd07.appspot.com/o/questions%2Fquestion.jpg?alt=media&token=60c3f39e-4716-4473-96be-2355d284168e" : ""}
                ref={canvas}
            />
        </Container>
    );
};

export default Index;   