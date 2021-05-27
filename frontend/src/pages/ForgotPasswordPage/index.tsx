import React, { FC, useEffect } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { observer, inject } from 'mobx-react';
import { Input, Button, Footer } from '../../components';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
        document.title = 'Soor - Şifremi Unuttum';
        window.scrollTo(0,0);
    }, [store])

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            history.push('/');
        }
    }, [history])

    useEffect(()=>{
        if(localStorage.getItem('token') === null){
            store!.passwordResetEmail = '';
        }
    }, [store])

    const submitForm=async ()=>{
        if(store!.passwordResetEmail !== ''){
            await store!.passwordReset();
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
                    description: 'Şifre sıfırlama linki mailinize gönderildi.',
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

    return (
        <>
            <div className='forgot-password-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Şifremi Unuttum</h2>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <Input type='email' variant='outline' placeholder='E-posta' value={store!.passwordResetEmail} className='w-100 my-4' onChange={(event : any)=>{ store!.passwordResetEmail = event.target.value.replace(' ', ''); }} />
                        <Button text={'Şifre Sıfırla'}  className='submit-button' type='submit' size='sm' disabled={store?.isLoading} isLoading={store?.isLoading} />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}));

export default Index;