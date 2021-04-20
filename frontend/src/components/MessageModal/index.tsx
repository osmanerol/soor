import React from 'react';
import './index.scss';
import { Button } from '../index';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { TextArea } from '../index';
import { FiMessageSquare } from 'react-icons/fi';

const Index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button text='Mesaj At' size='sm' leftIcon={<FiMessageSquare />} className='send-message-button text' onClick={onOpen} />
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Mesaj At</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TextArea className='sub-text' />
                    </ModalBody>    
                    <ModalFooter>
                        <Button text='Vazgeç' size='sm' className='cancel-button' onClick={onClose} />
                        <Button text='Gönder' size='sm' className='send-button' onClick={onClose} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Index;