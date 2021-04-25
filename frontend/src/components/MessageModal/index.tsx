import React, { FC, useState } from 'react';
import './index.scss';
import { Button } from '../index';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { TextArea } from '../index';
import { FiMessageSquare } from 'react-icons/fi';

interface IDefaultProps{
    instructorId: any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    //const { instructorId } = props;
    const [message, setMessage] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const messageSubmit=()=>{
        alert('asd')
    }

    return (
        <div>
            <Button text='Mesaj At' size='sm' leftIcon={<FiMessageSquare />} className='send-message-button text' onClick={onOpen} />
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Mesaj At</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TextArea onChange={(event : any)=>{ if(event?.target.value!=='') setMessage(event?.target.value)}} />
                    </ModalBody>    
                    <ModalFooter>
                        <Button text='Vazgeç' size='sm' className='cancel-button' onClick={onClose} />
                        <Button text='Gönder' size='sm' className='send-button' disabled={message === ''} onClick={messageSubmit}  />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Index;