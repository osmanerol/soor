import React, { useState } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { Input, Button, PasswordInput } from '../../components';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Student from '../../assets/images/student.svg';
import Teacher from '../../assets/images/teacher.svg';

const Index = (props: any) => {
    const [userType, setUserType]=useState(0);
    const { control } = useForm();
    const toast = useToast();
    const history= useHistory();

    const clickButton=()=>{
        if(userType>0){
            toast({
                title: 'Hesap oluşturuldu.',
                description: 'Giriş ekranına yönlendiriliyorsunuz.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setTimeout(()=>{
                history.push('/login')
            }, 2000)
        }
    }

    return (
        <div className='signup-page-container'>
            <div className='row w-100 h-100 m-0'>
                <div className='col-md-6 col-12 form-container'>
                    <div className='form'>
                        <div className='title'>
                                    <Link className='header' to='/'>
                                        <img src={logo} alt='logo'/>
                                        <span className='header-title'>Soor</span>
                                    </Link>
                            <h2 className='header-sub-title text-center'>Kaydol</h2>
                        </div>
                        <div className='user-type'>
                            <div onClick={()=>setUserType(1)} className={userType===1 ? 'item text-center bg-shadow' : 'item text-center'}>
                                <img src={Student} alt='student'/>
                                <p>Öğrenciyim</p>
                            </div>
                            <div onClick={()=>setUserType(2)} className={userType===2 ? 'item text-center bg-shadow' : 'item text-center'}>
                                <img src={Teacher} alt='teacher'/>
                                <p>Eğitmenim</p>
                            </div>
                        </div>
                        <form>
                            <Input text='Ad' control={control} variant='flushed' className='my-2' />
                            <Input text='Soyad' control={control} variant='flushed' className='my-2' />
                            <Input text='E-posta adresi' control={control} variant='flushed' className='my-2' />
                            <PasswordInput text='Parola' control={control} variant='flushed' className='my-2' />
                            <Button text={userType===0 ? 'Kaydol' : userType===1 ? 'Öğrenci - Kaydol' : 'Eğitmen - Kaydol'} className='col-lg-7 col-md-10 mx-auto p-0 my-3' onClick={clickButton} disabled={userType===0} />
                            <div className='text-center'>
                                <small className='text-muted'>
                                    Kaydolduğunda <Link to='/'>Üyelik Sözleşmesini</Link> ve <Link to='/'>Gizlilik Sözleşmesini</Link> kabul etmiş olursunuz.
                                </small>
                            </div>
                        </form>
                        <div className='go-sign text-center'>
                            <small className='text-muted'>
                                Hesabın var mı ? <Link to='/login' className='ml-2'>Giriş Yap</Link>
                            </small>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 d-md-block d-none background-image'>
                </div>
            </div>
        </div>
    );
};

export default Index;