import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Input, PasswordInput, Spinner, Button } from '../../components';
import { Container } from 'react-bootstrap';
import { useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import DefaultProfile from '../../assets/images/defaultProfile.png';
import StudentStore from '../../application/student/store/studentStore';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps{
    StudentStore? : typeof StudentStore,
    UserStore? : typeof UserStore,
}

const Index : FC<IDefaultProps> = inject('StudentStore', 'UserStore')(observer((props : IDefaultProps) => {
    const { StudentStore : store, UserStore : userStore } = props;
    const [selectMenu, setSelectMenu] = useState(1);
    const [tempImage, setTempImage] = useState('');
    const history = useHistory();
    const [changePasswordUser, setChangePasswordUser] = useState({
        old_password: '',
        new_password1: '',
        new_password2: ''
    });
    const toast = useToast();

    const personalInfoSchema = yup.object().shape({
        first_name : yup.string().required('Zorunlu alan'),
        last_name : yup.string().required('Zorunlu alan'),
        email : yup.string().required('Zorunlu alan'),
        credit : yup.string().required('Zorunlu alan'),
    })

    const passwordSchema = yup.object().shape({
        old_password : yup.string().required('Zorunlu alan'),
        new_password1 : yup.string().required('Zorunlu alan'),
        new_password2 : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })

    const { handleSubmit : handleSubmitPassword, register: registerPassword, errors: errorsPassword } = useForm({
        resolver: yupResolver(passwordSchema)
    })

    useEffect(()=>{
        if(localStorage.getItem('userType') !== '1'){
            history.push('/');
        }
        const getStudent = async () => {
            await store!.getProfile();
        }
        getStudent();
    }, [store, history])
    
    useEffect(()=>{
        document.title = 'Soor - Ayarlar';
        window.scrollTo(0,0);
    }, [])

    const handleSubmitPersonalChange= async ()=>{
        await store?.update();
        if(store?.error){
            toast({
                title: 'Hata',
                description: 'Hata',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Başarılı',
                description: 'Bilgiler başarıyla güncellenmiştir.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            userStore!.baseUser.first_name = store!.student.first_name;
            userStore!.baseUser.last_name = store!.student.last_name;
            userStore!.baseUser.image = store!.student.student.image;
        }
    }

    const submitPassword = async () => {
        if(changePasswordUser.new_password1 !==changePasswordUser.new_password2){
            toast({
                title: 'Hata',
                description: 'Yeni şifre ve yeni şifre tekrar aynı olmalı.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            await store!.updatePassword(changePasswordUser);
            if(store!.error){
                toast({
                    title: 'Hata',
                    description: 'Hata',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    title: 'Başarılı',
                    description: 'Şifre başarıyla güncellenmiştir.',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    }

    const deleteProfile = async () => {
        await store!.deleteUser();
        if(store!.error === ''){
            localStorage.clear();
            await userStore!.getUser();
            toast({
                title: 'Başarılı',
                description: 'Hesap başarıyla silindi. Anasayfaya yönlendiriliyorsunuz.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setTimeout(()=>{
                history.push('/');
            }, 2000)
        }
    }

    const handleChange=(event: any)=>{
        if(event.target.files[0]){
            let file = event.target.files[0];
            setTempImage(URL.createObjectURL(file));
            store!.student.student.image = file;
        }
    }

    return (
        <>
            {
                store?.isLoading ?
                <div className='settings-page-container'> 
                    <Spinner />
                </div> :
                <>
                    <div className='settings-page-container'>
                        <Container>
                            <div className="settings-container">
                                <ul className="menu">
                                    <li className={`${selectMenu === 1 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(1)}><BiUser className='list-icon' /> <span>Profil</span></li>
                                    <li className={`${selectMenu === 2 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(2)}><FiLock className='list-icon' /><span>Şifre</span></li>
                                    <li className={`${selectMenu === 3 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(3)}><RiDeleteBin7Line className='list-icon' /><span>Hesabı Kapat</span></li>
                                </ul>
                                <div className="form-container">
                                    {
                                        selectMenu === 1 && 
                                        <form onSubmit={handleSubmit(handleSubmitPersonalChange)}>
                                            <h2 className='sub-title text-center mb-4'>Profil Bilgilerini Güncelle</h2>
                                            <div className="image-update-container">
                                                <div className="image-container mb-3">
                                                    <img src={(store!.student.student.image === '' || store!.student.student.image === null) ? DefaultProfile : tempImage === '' ? store!.student.student.image : tempImage} alt="user"/>
                                                </div>
                                                <input type="file" className='mb-3 sub-text image-input' onChange={(event : any)=>handleChange(event)} />
                                            </div>
                                            <div className='row p-0'>
                                                <Input text='Ad' id='first_name' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={store!.student.first_name} selectRef={register} errors={errors} onChange={(event: any)=>store!.student.first_name = event.target.value} />
                                                <Input text='Soyad' id='last_name' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={store!.student.last_name} selectRef={register} errors={errors} onChange={(event: any)=>store!.student.last_name = event.target.value} />
                                            </div>
                                            <Input text='E-posta' id='email' type='email' size='sm' variant='flushed' className='mb-3' defaultValue={store!.student.email} selectRef={register} errors={errors} onChange={(event: any)=>store!.student.email = event.target.value } />
                                            <Input text='Kredi' id='credit' size='sm' variant='flushed' className='mb-3' defaultValue={(store!.student.student.credit).toString()} selectRef={register} errors={errors} onChange={(event: any)=>store!.student.student.credit = event.target.value } />
                                            <Button text='Profil bilgilerini güncelle' size='sm' className='button save-button mx-auto mt-1' type='submit' />
                                        </form>
                                    }
                                    {
                                        selectMenu === 2 && 
                                        <form onSubmit={handleSubmitPassword(submitPassword)}>
                                            <h2 className='sub-title text-center mb-4'>Şifre Güncelle</h2>
                                            <PasswordInput text='Güncel şifre' id='old_password' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, old_password: event.target.value })}} />
                                            <PasswordInput text='Yeni şifre' id='new_password1' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password1: event.target.value })}} />
                                            <PasswordInput text='Yeni şifre tekrar' id='new_password2' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password2: event.target.value })}} />
                                            <Button text='Şifreyi güncelle' size='sm' type='submit' className='button save-button mx-auto mt-3' />
                                        </form>
                                    }
                                    {
                                        selectMenu === 3 && 
                                        <div className='remove-account-container'>
                                            <h2 className='sub-title text-center mb-3'>Hesabı Kapat</h2>
                                            <p className='sub-text text-center mb-3'>Hesabı kapatmak istediğinizden emin misiniz ?</p>
                                            <div className="text-center">
                                                <Button text='Hesabı Kapat' size='sm' showConfirm={true} onClick={deleteProfile} confirmText={'Hesap bilgileriniz silinecektir. İşlemi yapmak istediğinize emin misiniz ?'} className='button delete-button' />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>
                </>
            }
        </>
    );
}));

export default Index;