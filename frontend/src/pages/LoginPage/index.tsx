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
        email: '',
        password: ''
    })
    const toast = useToast();
    const history= useHistory();
    const { handleSubmit } = useForm();

    const submitForm=()=>{
        if(userType>0){
            if(user.email !== '' && user.password !== ''){
                toast({
                    title: 'Giriş başarılı',
                    description: 'Anasayfaya yönlendiriliyorsunuz.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(()=>{
                    history.push('/');
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
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <div className='login-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Giriş Yap</h2>
                    </div>
                    <div className='type-container my-3'>
                        <div className={`${userType === 1 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(1)}>
                            <img src={student} alt='student'/>
                            <p className='sub-text mt-2'>Öğrenci</p>
                        </div>
                        <div className={`${userType === 2 ? 'type-item active text-center' : 'type-item text-center'}`} onClick={()=>setUserType(2)}>
                            <img src={teacher} alt='teacher'/>
                            <p className='sub-text mt-2'>Eğitmen</p>
                        </div>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <Input type='email' variant='outline' placeholder='E-posta' className='w-100' onChange={(event : any)=>{
                            setUser({...user, email: event.target.value});
                        }} />
                        <PasswordInput variant='outline' placeholder='Şifre' className='mt-2 w-100' onChange={(event : any)=>{
                            setUser({...user, password: event.target.value});
                        }} />
                        <small className='forget-password text-right my-2'><Link to='/'>Şifremi unuttum</Link></small>
                        <Button text={`Giriş Yap ${userType > 0 ? userType === 1 ? '( Öğrenci )' : '( Eğitmen )' : ''}`}  className='submit-button' type='submit' size='sm' disabled={userType===0} />
                    </form>
                    <div className='go-other-sign text-center mt-4'>
                        <small className='text-muted'>Hesabınız yok mu ? <Link to='/signup'>Kaydol</Link></small>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Index;