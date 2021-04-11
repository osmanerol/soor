import React, { FC, useState } from 'react';
import './index.scss';
import { Button, Select } from '../index';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

interface IDefaultProps{
    lessons: any,
    lessonPrice: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { lessons, lessonPrice } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [lesson, setSelectedLesson] = useState(-1);
    const amount = 100;    
    const { control } = useForm();

    return (
        <div>
            <Button text='Soru sor' size='sm' leftIcon={<FaQuestion />} className='lesson-button' onClick={onOpen}>Open Modal</Button>
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Soru sor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            amount >= lessonPrice ?
                            <>
                                <div className='mb-3'>
                                    <p>Hangi derste soru sormak istiyorsunuz ?<span className='text-danger ml-1'>*</span></p>
                                    <Select datas={lessons} placeholder='Ders seç' size='sm' onChange={(event: any)=>setSelectedLesson(parseInt(event.target.value))} id='id' value='name' control={control}/>
                                </div>
                                <div className='mb-3'>
                                    <p>Soracağınız sorularınn fotoğraflarını yüklemek ister misiniz ?</p>
                                    <input type='file' className='mt-2' multiple />
                                </div>
                                <div className='mb-3 lesson-information'>
                                    <p>Ders ücreti <span className='text-bold'>{lessonPrice} TL</span> ders bitiminde hesabından çekilecektir. Eğitmen onayından sonra derslerim alanında bildirim olarak ders linkini görebilirsin. Link'e 5 dakika içinde tıklayarak derste olmanı bekliyoruz. İyi dersler...</p>
                                </div>
                            </> :
                            <>
                                <div className='mb-3'>
                                    <p className='text-danger'>Bakiyeniz soru sormak için yeterli değil. Bakiye yüklemek için <Link to='/'>tıklayınız.</Link> </p>
                                </div>
                            </>
                        }
                    </ModalBody>    
                    <ModalFooter>
                        <Button text='Vazgeç' size='sm' className='cancel-button' onClick={onClose} />
                        {
                            amount >= lessonPrice && <Button text='Onayla' size='sm' className='confirm-button' disabled={lesson === -1} onClick={onClose} />
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Index;