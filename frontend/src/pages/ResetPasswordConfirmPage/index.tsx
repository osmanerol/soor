import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { observer, inject } from 'mobx-react';
import { PasswordInput, Button, Footer } from '../../components';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps {
    UserStore? : typeof UserStore
    match? : any
}

const Index : FC<IDefaultProps> = inject('UserStore')(observer((props : IDefaultProps) => {
    const { UserStore : store, match } = props;
    const [new_password, setNewPassword] = useState('');
    const [re_new_password, setReNewPassword] = useState('');
    const toast = useToast();
    const history= useHistory();
    const { handleSubmit } = useForm();

    useEffect(()=>{
        document.title = 'Soor - Şifremi Unuttum';
        window.scrollTo(0,0);
    }, [store])

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            history.push('/');
        }
    }, [history])

    const submitForm=async ()=>{
        if(new_password !== '' && re_new_password !== ''){
            if(new_password !== re_new_password){
                toast({
                    title: 'Hata',
                    description: 'Şifre ve şifre tekrar alanı aynı olmalı.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
            else{
                const uid = match.params.uid;
                const token = match.params.token;
                await store!.passwordResetConfirm(uid, token, new_password, re_new_password);
                if(store?.error){
                    let error = Object.values(store?.error);
                    toast({
                        title: 'Hata',
                        description: error,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                    store!.error = false;
                }
                else{
                    toast({
                        title: 'Başarılı',
                        description: 'Şifre başarıyla güncellendi.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    setTimeout(()=>{
                        history.push('/login');
                    }, 2000);
                }
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

    return (
        <>
            <div className='forgot-password-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Şifremi Sıfırla</h2>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <PasswordInput  variant='outline' placeholder='Şifre' className='w-100 my-4' onChange={(event : any)=>{ setNewPassword(event.target.value.replace(' ', '')) }} />
                        <PasswordInput variant='outline' placeholder='Şifre Tekrar' className='w-100 mb-4' onChange={(event : any)=>{ setReNewPassword(event.target.value.replace(' ', '')) }} />
                        <Button text={'Şifre Sıfırla'} className='submit-button' type='submit' size='sm' disabled={store?.isLoading} isLoading={store?.isLoading} />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}));

export default Index;