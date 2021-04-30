import React, { FC, useState } from 'react';
import './index.scss';
import { Button, Select } from '../index';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
//import { FaQuestion } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { BsCameraVideoFill } from 'react-icons/bs';

interface IDefaultProps{
    lessons: any,
    lessonPrice: number,
    credit: number,
    disabled: boolean
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { lessons, lessonPrice, credit, disabled } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [lesson, setSelectedLesson] = useState(-1);
    const { control } = useForm();

    return (
        <div>
            <Button text='Soru sor' size='sm' leftIcon={<BsCameraVideoFill />} className='lesson-button' disabled={disabled} onClick={onOpen} />
            <Modal size={'xl'} onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Soru sor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            credit >= lessonPrice ?
                            <>
                                <div className='mb-3'>
                                    <p className='sub-text'>Hangi derste soru sormak istiyorsunuz ?<span className='text-danger ml-1'>*</span></p>
                                    <Select datas={lessons} placeholder='Ders seç' size='sm' onChange={(event: any)=>setSelectedLesson(parseInt(event.target.value))} id='id' value='name' control={control}/>
                                </div>
                                <div className='mb-3'>
                                    <p className='sub-text'>Soracağınız soruların fotoğraflarını yüklemek ister misiniz ?</p>
                                    <input type='file' className='mt-2 sub-text' multiple />
                                </div>
                                <div className='mb-3 lesson-information'>
                                    <p className='sub-text'>Ders ücreti <span className='text-bold'>{lessonPrice} TL</span> ders bitiminde hesabından çekilecektir. Eğitmen onayından sonra derslerim alanında bildirim olarak ders linkini görebilirsin. Link'e 5 dakika içinde tıklayarak derste olmanı bekliyoruz. İyi dersler...</p>
                                </div>
                            </> :
                            <>
                                <div className='mb-3'>
                                    <p className='text-danger text'>Bakiyeniz soru sormak için yeterli değil. Bakiye yüklemek için <Link to='/'>tıklayınız.</Link> </p>
                                </div>
                            </>
                        }
                    </ModalBody>    
                    <ModalFooter>
                        <Button text='Vazgeç' size='sm' className='cancel-button' onClick={onClose} />
                        {
                            credit >= lessonPrice && <Button text='Onayla' size='sm' className='confirm-button' disabled={lesson === -1} onClick={onclick} />
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Index;