import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { Button, Select } from '../index';
import { inject, observer } from 'mobx-react';
import { useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsCameraVideoFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../services/firebaseConfig';
import LessonStore from '../../application/lesson/store/lessonStore';
import InstructorStore from '../../application/instructor/store/instructorStore';
import StudentStore from '../../application/student/store/studentStore';

interface IDefaultProps{
    LessonStore? : typeof LessonStore,
    InstructorStore? : typeof InstructorStore,
    StudentStore? : typeof StudentStore,
    lessons: any,
    lessonPrice: number,
    credit: number,
    disabled: boolean,
    instructorId : number,
    studentId : number,
}

const Index : FC<IDefaultProps> = inject('LessonStore', 'InstructorStore', 'StudentStore')(observer((props : IDefaultProps) => {
    const { LessonStore : lessonStore, InstructorStore : instructorStore, StudentStore : studentStore, lessons, lessonPrice, credit, disabled, instructorId, studentId } = props;
    const [fileError, setFileError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { control } = useForm();
    const toast = useToast();
    const history = useHistory();

    useEffect(() => {
        lessonStore!.createLesson();
    }, [lessonStore])

    const clickConfirm =async () => {
        setIsLoading(true);
        const callDoc = firestore.collection('calls').doc();
        lessonStore!.lesson.link = callDoc.id;
        lessonStore!.lesson.instructor = instructorId;
        lessonStore!.lesson.student = studentId;
        await lessonStore?.createLessonRequest();
        await instructorStore!.increaseInstructorBalance(instructorId);
        await studentStore!.decreasetudentCredit(lessonPrice);
        setIsLoading(false);
        history.push('/lessons');
    }

    const handleChange=(event: any)=>{
        if(event.target.files[0].name.includes('.jpg') || event.target.files[0].name.includes('.png')){
            if(event.target.files[0]){
                let image = event.target.files[0];
                lessonStore!.lesson.image = image;
            }
            setFileError(false);
        }
        else{
            setFileError(true);
            toast({
                title: 'Hata',
                description: 'Desteklenmeyen dosya formatı. Png veya jpg türünde dosya seçiniz.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
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
                                    <input type='file' className='mt-2 sub-text' onChange={(event : any)=>handleChange(event)}/>
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
                            credit >= lessonPrice && <Button text='Onayla' size='sm' className='confirm-button' disabled={lessonStore!.lesson.lecture === 0 || fileError || isLoading} isLoading={isLoading} onClick={clickConfirm} />
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}));

export default Index;