import React, { FC, useEffect } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { observer, inject } from 'mobx-react';
import { Input, Button, PasswordInput, Footer } from '../../components';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import student from '../../assets/images/student.svg';    
import teacher from '../../assets/images/teacher.svg';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps {
    UserStore? : typeof UserStore
}

const Index : FC<IDefaultProps> = inject('UserStore')(observer((props : IDefaultProps) => {
    const { UserStore : store } = props;
    const toast = useToast();
    const history= useHistory();
    const { handleSubmit } = useForm();  

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            history.push('/');
        }
    }, [history])
    
    useEffect(()=>{
        store!.createSignupUser();
        window.scrollTo(0,0);
    }, [store])

    const submitForm=async ()=>{
        if(store!.signupUser.is_student || store!.signupUser.is_instructor){
            if(store!.signupUser.first_name !=='' && store!.signupUser.last_name !== '' &&store!.signupUser.email !== '' && store!.signupUser.password !== ''){
                await store!.signup();
                if(store!.error){
                    toast({
                        title: 'Hata',
                        description: store?.error.email ? 'E-posta hesabı daha önce kullanılmış.' : 'Beklenmedik hata oluştu. Tekrar deneyiniz.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                    store!.error = {};
                }
                else{
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
        <>
            <div className='signup-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Kaydol</h2>
                    </div>
                    <div className='type-container'>
                        <div className={cx('type-item text-center', {'active' : store!.signupUser.is_student})} onClick={()=>{ store!.signupUser.is_student = true; store!.signupUser.is_instructor = false; }}>
                            <img src={student} alt='student'/>
                            <p className='type-item-text mt-2'>Öğrenci</p>
                        </div>
                        <div className={cx('type-item text-center', {'active' : store!.signupUser.is_instructor})} onClick={()=>{ store!.signupUser.is_student = false; store!.signupUser.is_instructor = true; }}>
                            <img src={teacher} alt='teacher'/>
                            <p className='type-item-text mt-2'>Eğitmen</p>
                        </div>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <div className='full-name-container'>
                            <Input variant='outline' placeholder='Ad' className='w-100' onChange={(event : any)=>{
                                store!.signupUser.first_name = event.target.value;
                            }} />
                            <Input variant='outline' placeholder='Soyad' className='w-100' onChange={(event : any)=>{
                                store!.signupUser.last_name = event.target.value;
                            }} />
                        </div>
                        <Input type='email' variant='outline' placeholder='E-posta' className='mt-2 w-100' onChange={(event : any)=>{
                            store!.signupUser.email = event.target.value;
                        }} />
                        <PasswordInput variant='outline' placeholder='Şifre'  className='mt-2 w-100' onChange={(event : any)=>{
                            store!.signupUser.password = event.target.value;
                        }} />
                        <Button text={`Kaydol ${(store!.signupUser.is_student || store!.signupUser.is_instructor) ? store!.signupUser.is_student ? '( Öğrenci )' : '( Eğitmen )' : ''}`}  className='submit-button mt-2' size='sm' type='submit' disabled={(!store!.signupUser.is_student && !store!.signupUser.is_instructor) || store?.isLoading} isLoading={store?.isLoading} />
                    </form>
                    <small className='text-center aggrements text-muted'>Kaydolduğunuzda <Link to='/'>üyelik</Link> ve <Link to='/'>gizlilik</Link> sözleşmesini kabul etmiş olursunuz.</small>
                    <div className='go-other-sign text-center'>
                        <small className='text-muted'>Zaten hesabınız var mı ? <Link to='/login'>Giriş Yap</Link></small>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}));

export default Index;