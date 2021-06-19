import React, { useRef } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import CanvasDraw from "react-canvas-draw";
import { Button } from '../../components';

const Index = () => {
    const canvas = useRef<any>();

    const clearCanvas = () => {
        canvas.current!.clear();
    }

    const undoCanvas = () => {
        canvas.current!.undo();
    }
    
    return (
        <Container className='drawer-page-container'>
            <div className="row py-2">
                <Button text='Temizle' className='col-md-2 col-sm-4 col-6 clear-button' size='sm' onClick={clearCanvas} />
                <Button text='Geri al' className='col-md-2 col-sm-4 col-6 undo-button' size='sm' onClick={undoCanvas} />
            </div>
            <CanvasDraw 
                ref={canvasDrawer => { canvas.current = canvasDrawer }}
                brushRadius={3}
                brushColor='#444'
                canvasWidth={600}
                canvasHeight={600}
                imgSrc={localStorage.getItem('image') ? localStorage.getItem('image')! : ""}
            />
        </Container>
    );
};

export default Index;   