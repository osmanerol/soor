import React, { useState, useEffect } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { Input, Button, PasswordInput, Footer } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import student from '../../assets/images/student.svg';    
import teacher from '../../assets/images/teacher.svg';

const Index = () => {
    const [userType, setUserType]=useState(0);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const toast = useToast();
    const history= useHistory();
    const { handleSubmit } = useForm();  

    const submitForm=()=>{
        if(userType>0){
            if(user.firstName !=='' && user.lastName !== '' &&user.email !== '' && user.password !== ''){
                toast({
                    title: 'Kayıt başarılı',
                    description: 'Giriş ekranına yönlendiriliyorsunuz.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(()=>{
                    history.push('/login');
                }, 2000);
            }
            else{
                toast({
                    title: 'Hata',
                    description: 'Tüm alanları doldurunuz.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    }

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    return (
        <>
            <div className='signup-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Kaydol</h2>
                    </div>
                    <div className='type-container my-3'>
                        <div className={`${userType===1 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(1)}>
                            <img src={student} alt='student'/>
                            <p className='type-item-text mt-2'>Öğrenci</p>
                        </div>
                        <div className={`${userType===2 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(2)}>
                            <img src={teacher} alt='teacher'/>
                            <p className='type-item-text mt-2'>Eğitmen</p>
                        </div>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <div className='full-name-container'>
                            <Input variant='outline' placeholder='Ad' className='w-100' onChange={(event : any)=>{
                                setUser({...user, firstName: event.target.value});
                            }} />
                            <Input variant='outline' placeholder='Soyad' className='w-100' onChange={(event : any)=>{
                                setUser({...user, lastName: event.target.value});
                            }} />
                        </div>
                        <Input type='email' variant='outline' placeholder='E-posta' className='mt-2 w-100' onChange={(event : any)=>{
                            setUser({...user, email: event.target.value});
                        }} />
                        <PasswordInput variant='outline' placeholder='Şifre'  className='mt-2 w-100' onChange={(event : any)=>{
                            setUser({...user, password: event.target.value});
                        }} />
                        <Button text={`Kaydol ${userType > 0 ? userType === 1 ? '( Öğrenci )' : '( Eğitmen )' : ''}`}  className='submit-button mt-2' size='sm' type='submit' disabled={userType===0} />
                    </form>
                    <small className='text-center aggrements text-muted mt-2 mt-4'>Kaydolduğunuzda <Link to='/'>üyelik</Link> ve <Link to='/'>gizlilik</Link> sözleşmesini kabul etmiş olursunuz.</small>
                    <div className='go-other-sign text-center mt-4'>
                        <small className='text-muted'>Zaten hesabınız var mı ? <Link to='/login'>Giriş Yap</Link></small>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Index;
/*
import React, { useState } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { Input, Button, PasswordInput } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../assets/images/logo.png';
import student from '../../assets/images/student.svg';    
import teacher from '../../assets/images/teacher.svg';

const Index = () => {
    const [userType, setUserType]=useState(0);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const toast = useToast();
    const history= useHistory();
    const { handleSubmit } = useForm();  

    const submitForm=()=>{
        if(userType>0){
            if(user.firstName !=='' && user.lastName !== '' &&user.email !== '' && user.password !== ''){
                toast({
                    title: 'Kayıt başarılı',
                    description: 'Giriş ekranına yönlendiriliyorsunuz.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(()=>{
                    history.push('/login');
                }, 2000);
            }
            else{
                toast({
                    title: 'Hata',
                    description: 'Tüm alanları doldurunuz.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    }

    return (
        <div className='signup-page-container'>
            <div className='signup-page-sub-container'>
                <div className='form-container'>
                    <div className='form-content'>
                    <Link className='brand' to='/' >
                        <img src={logo} alt='logo'/>
                        <h2 className='brand-text'>Soor</h2>
                    </Link>
                    <div className='text-center'>
                        <h2 className='title'>Kaydol</h2>
                    </div>
                    <div className='type-container'>
                        <div className={`${userType===1 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(1)}>
                            <img src={student} alt='student'/>
                            <p className='type-item-text mt-2'>Öğrenciyim</p>
                        </div>
                        <div className={`${userType===2 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(2)}>
                            <img src={teacher} alt='teacher'/>
                            <p className='type-item-text mt-2'>Eğitmenim</p>
                        </div>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <div className='full-name-container'>
                            <Input text='Ad' variant='flushed' className='w-100' onChange={(event : any)=>{
                                setUser({...user, firstName: event.target.value});
                            }} />
                            <Input text='Soyad' variant='flushed' className='w-100' onChange={(event : any)=>{
                                setUser({...user, lastName: event.target.value});
                            }} />
                        </div>
                        <Input text='E-posta' type='email' variant='flushed' className='w-100' onChange={(event : any)=>{
                            setUser({...user, email: event.target.value});
                        }} />
                        <PasswordInput text='Şifre' variant='flushed' className='mt-2 w-100' onChange={(event : any)=>{
                            setUser({...user, password: event.target.value});
                        }} />
                        <Button text={`Kaydol ${userType > 0 ? userType === 1 ? '( Öğrenci )' : '( Eğitmen )' : ''}`}  className='submit-button mt-2' size='sm' type='submit' disabled={userType===0} />
                    </form>
                    <small className='text-center text-muted mt-2'>Kaydolduğunuzda <Link to='/'>üyelik</Link> ve <Link to='/'>gizlilik</Link> sözleşmesini kabul etmiş olursunuz.</small>
                    <div className='go-other-sign text-center'>
                        <small className='text-muted'>Zaten hesabınız var mı ? <Link to='/login'>Giriş Yap</Link></small>
                    </div>
                </div>
            </div>
            <div className='image-container'></div>
        </div>
    </div>
);
};

export default Index;
*/