import React, { FC, useEffect, useState } from 'react';
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
    const [email, setEmail] = useState('');
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
        if(email !== ''){
            await store!.passwordReset(email);
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
                setEmail('');   
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
            <div className='forgot-password-confirm-page-container'>
                <div className='form-content'>
                    <div className='text-center'>
                        <h2 className='title'>Şifremi Unuttum</h2>
                    </div>
                    <form className='form' onSubmit={handleSubmit(submitForm)}>
                        <Input type='email' variant='outline' placeholder='E-posta' value={email} className='w-100 my-4' onChange={(event : any)=>{ setEmail(event.target.value.replace(' ', '')) }} />
                        <Button text={'Şifre Sıfırla'}  className='submit-button' type='submit' size='sm' disabled={store?.isLoading} isLoading={store?.isLoading} />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}));

export default Index;