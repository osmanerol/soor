import React, { FC } from 'react';
import './index.scss';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Button } from '../index';

interface IDefaultProps{
    isOpen : boolean,
    onClose : any,
    confirmText : string,
    onClick : any

}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { isOpen, onClose, confirmText, onClick } = props;

    const _onClick=()=>{
        onClick();
        onClose();
    }

    return (
        <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p className='sub-text'>{ confirmText }</p>
                </ModalBody>    
                <ModalFooter>
                    <Button text='Hayır' size='sm' className='cancel-button' onClick={onClose} />
                    <Button text='Evet' size='sm' className='confirm-button' onClick={_onClick} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Index;