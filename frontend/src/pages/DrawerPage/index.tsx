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
                imgSrc={localStorage.getItem('image') ? localStorage.getItem('image')! : ""}
                ref={canvas}
            />
        </Container>
    );
};

export default Index;   