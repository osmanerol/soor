import React, { useEffect, useState, FC } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Input, Button } from '../../components';
import { inject, observer } from 'mobx-react';
import { useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { useForm } from 'react-hook-form';
import InstructorStore from '../../application/instructor/store/instructorStore';
import StudentStore from '../../application/student/store/studentStore';

interface IDefaultProps{
    InstructorStore? : typeof InstructorStore,
    StudentStore?: typeof StudentStore
}

const Index : FC<IDefaultProps> = inject('InstructorStore', 'StudentStore')(observer((props : IDefaultProps) => {
    const { InstructorStore : instructorStore, StudentStore: studentStore } = props;
    const [instructorInfo, setInstructorInfo] = useState({
        ibanNo : 'TR',
        amount : 0
    });
    const [studentInfo, setStudentInfo] = useState({
        amount : 0
    });
    const toast = useToast();

    useEffect(()=>{
        document.title = 'Soor - Bakiye';
        window.scrollTo(0,0);
    }, [])

    const instructorInfoSchema = yup.object().shape({
        ibanNo : yup.string().required('Bu alan zorunludur'),
        amount : yup.string().required('Bu alan zorunludur')
    })

    const studentInfoSchema = yup.object().shape({
        amount : yup.string().required('Bu alan zorunludur')
    })

    const { handleSubmit : handleSubmitInstructor, register : registerInstructor, errors : errorsInstructor } = useForm({
        resolver: yupResolver(instructorInfoSchema)
    })
    
    const { handleSubmit : handleSubmitStudent, register : registerStudent, errors : errorsStudent } = useForm({
        resolver: yupResolver(studentInfoSchema)
    })

    const onChangeInstructorIbanInput = (event : any) => {
        let value = event.target.value;
        if(value.length < 2){
            instructorInfo.ibanNo = 'TR';
        }
        else if(value.length < 27){
            setInstructorInfo({ ...instructorInfo, ibanNo : event.target.value });
        }
    }

    const confirmClick = async () => {
        if(localStorage.getItem('userType') === '1'){
            await studentStore?.updateCredit(studentInfo);
            toast({
                title: 'Başarılı',
                description: 'Yatırma işlemi başarılı.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        else{
            if(instructorInfo.amount > instructorStore!.instructor.instructor.balance) {
                toast({
                    title: 'Hata',
                    description: 'Girilen değer bakiyeden fazla olamaz.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
            else{
                if(instructorInfo.ibanNo.length !== 26){
                    toast({
                        title: 'Hata',
                        description: 'IBAN numarası 26 karakter olmalıdır.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                }
                else{
                    await instructorStore!.updateBalance(instructorInfo);
                    toast({
                        title: 'Başarılı',
                        description: 'Çekim işlemi başarılı.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                }
            }
        }
    }

    return (
        <div className='balance-page-container pb-4'>
            <h2 className='title text-center py-4'>Bakiye</h2>
            <Container>
                {
                    localStorage.getItem('userType') === '1' ?
                    <div className='balance mt-4'>
                        <form className='balance-form' onSubmit={handleSubmitStudent(confirmClick)}>
                            <h3 className='sub-title text-center mb-4'>Para Yatır</h3>
                            <p className='sub-text text-right mb-2'>Toplam Bakiye : { studentStore!.student.student.credit } TL</p>
                            <p className='my-3'>IBAN : TR12 1234 5678 9012 3456 7890 12</p>
                            <p className='my-3'>Ziraat Bankası İstanbul Şubesi</p>
                            <Input text='Yatırmak istediğiniz tutar' type='number' id='amount' className='mb-4' errors={errorsStudent} selectRef={registerStudent} onChange={(event : any) => setStudentInfo({ amount : event.target.value })}  />
                            <Button text='Para Yatır' type='submit' isLoading={studentStore!.isLoading} />
                        </form>
                    </div>:
                    <div className='balance mt-4'>
                        <form className='balance-form' onSubmit={handleSubmitInstructor(confirmClick)}>
                            <h3 className='sub-title text-center mb-2'>Para Çekme</h3>
                            <p className='sub-text text-right mb-2'>Toplam Bakiye : { instructorStore!.instructor.instructor.balance} TL</p>
                            <Input text='IBAN' id='ibanNo' className='mb-4' errors={errorsInstructor} selectRef={registerInstructor} value={instructorInfo.ibanNo} onChange={(event : any) => onChangeInstructorIbanInput(event) } />
                            <Input text='Çekmek istediğiniz tutar' type='number' id='amount' className='mb-4' errors={errorsInstructor} selectRef={registerInstructor} onChange={(event : any) => setInstructorInfo({ ...instructorInfo, amount : event.target.value })}  />
                            <Button text='Çekimi Onayla' type='submit' isLoading={instructorStore!.isLoading} />
                        </form>
                    </div>
                }
            </Container>
        </div>
    );
}));

export default Index;