import React, { FC, useEffect } from 'react';
import './index.scss';
import { Button, Select } from '../index';
import { inject, observer } from 'mobx-react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsCameraVideoFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../services/firebaseConfig';
import LessonStore from '../../application/lesson/store/lessonStore';

interface IDefaultProps{
    LessonStore? : typeof LessonStore,
    lessons: any,
    lessonPrice: number,
    credit: number,
    disabled: boolean,
    instructorId : number,
}

const Index : FC<IDefaultProps> = inject('LessonStore')(observer((props : IDefaultProps) => {
    const { LessonStore : lessonStore, lessons, lessonPrice, credit, disabled, instructorId } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { control } = useForm();
    const history = useHistory();

    useEffect(() => {
        lessonStore!.createLesson();
    }, [lessonStore])

    const clickConfirm =async () => {
        const callDoc = firestore.collection('calls').doc();
        lessonStore!.lesson.link = callDoc.id;
        lessonStore!.lesson.instructor = instructorId;
        await lessonStore?.createLessonRequest();
        history.push('/lessons');
    }

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
                                    <Select datas={lessons} placeholder='Ders seç' size='sm' onChange={(event: any)=>lessonStore!.lesson.lecture = parseInt(event.target.value)} id='id' value='name' control={control}/>
                                </div>
                                <div className='mb-3'>
                                    <p className='sub-text'>Soracağın sorunun fotoğrafını yüklemek ister misiniz ?</p>
                                    <input type='file' className='mt-2 sub-text' multiple />
                                </div>
                                <div className='mb-3 lesson-information'>
                                    <p className='sub-text'>Ders ücreti <span className='text-bold'>{lessonPrice} TL</span> derse git'e tıkladığında hesabından çekilecektir. Ders linkini derslerim alanında görebilirsin. Link'e 2 dakika içinde tıklayarak derste olmanı bekliyoruz. İyi dersler...</p>
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
                            credit >= lessonPrice && <Button text='Onayla' size='sm' className='confirm-button' disabled={lessonStore!.lesson.lecture === 0} onClick={clickConfirm} />
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}));

export default Index;