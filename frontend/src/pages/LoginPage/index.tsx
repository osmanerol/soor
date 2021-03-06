import React, { FC, useEffect } from 'react';
import './index.scss';
import { useToast } from '@chakra-ui/react';
import { observer, inject } from 'mobx-react';
import { Input, Button, PasswordInput } from '../../components';
import { Link, useHistory } from 'react-router-dom';
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
        document.title = 'Soor - Giriş Yap';
        window.scrollTo(0,0);
    }, [store])

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            history.push('/');
        }
    }, [history])

    useEffect(()=>{
        if(localStorage.getItem('token') === null){
            store!.createLoginUser();
        }
    }, [store])

    const submitForm=async ()=>{
        if(store!.loginUser.email !== '' && store!.loginUser.password !== ''){
            await store!.login();
                if(store?.error){
                    toast({
                        title: 'Hata',
                        description: 'Kullanıcı adı veya şifre hatalı.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                store!.error = false;
            }
            else{
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
        <div className='login-page-container'>
            <div className='form-content'>
                <div className='text-center'>
                    <h2 className='title'>Giriş Yap</h2>
                </div>
                <form className='form' onSubmit={handleSubmit(submitForm)}>
                    <Input type='email' variant='outline' placeholder='E-posta' value={store!.loginUser.email} className='w-100' onChange={(event : any)=>{ store!.loginUser.email = event.target.value.replace(' ', ''); }} />
                    <PasswordInput variant='outline' placeholder='Şifre' className='mt-2 w-100' onChange={(event : any)=>{
                        store!.loginUser.password = event.target.value;
                    }} />
                    <small className='forget-password text-right my-2'><Link to='/reset-password'>Şifremi unuttum</Link></small>
                    <Button text={'Giriş Yap'}  className='submit-button' type='submit' size='sm' disabled={store?.isLoading} isLoading={store?.isLoading} />
                </form>
                <div className='go-other-sign text-center mt-4'>
                    <small className='text-muted'>Hesabınız yok mu ? <Link to='/signup'>Kaydol</Link></small>
                </div>
            </div>
        </div>
    );
}));

export default Index;