import React, { useState, useEffect } from 'react';
import './index.scss';
import { Input, Autocomplete, TextArea, PasswordInput, Button, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import { useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { FiMail, FiLock } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 

const Index = () => {
    const [selectMenu, setSelectMenu] = useState(1);
    const [user, setUser] = useState({
        image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg',
        firstName: 'Jessica',
        lastName: 'Jones',
        status: 1,
        job: 'Fizik Öğretmeni',
        email: 'jessicajones@gmail.com',
        university: 'İstanbul Üniversitesi Cerrahpaşa',
        department: 'Fizik Öğretmenliği',
        rate: 4.1,
        totalLesson: 22, 
        lessonPrice: 80,
        totalComment: 30,
        lessons: [{id: 0, name: 'Fizik'}, {id: 1, name: 'Matematik'}, {id: 2, name: 'Geometri'}],
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque reprehenderit excepturi voluptatem in odit quas mollitia! Recusandae doloremque sed necessitatibus doloribus voluptas corrupti iste rerum, nemo repellat incidunt expedita.Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iste, dolorum, quaerat suscipit sed provident quisquam dignissimos, minus velit sit quae nihil asperiores officia fugiat accusamus non cum! Ullam, soluta!'
    });
    const [selectedLessons, setSelectedLessons] = useState(user.lessons);
    const lessonsArray=[{id: 0, name: 'Fizik'}, { id: 1, name: 'Matematik'}, { id: 2, name: 'Geometri'}, { id: 3, name: 'Kimya'}, { id: 4, name: 'Edebiyat'}, { id: 5, name: 'Tarih'}];
    const [changeEmailUser, setChangeEmailUser] = useState({
        old_email: '',
        new_email: '',
        new_email_confirm: ''
    });
    const [changePasswordUser, setChangePasswordUser] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: ''
    });
    const toast = useToast();

    const personalInfoSchema = yup.object().shape({
        firstName : yup.string().required('Zorunlu alan'),
        lastName : yup.string().required('Zorunlu alan'),
        university : yup.string().required('Zorunlu alan'),
        department : yup.string().required('Zorunlu alan'),
        job : yup.string().required('Zorunlu alan'),
        lessonPrice : yup.string().required('Zorunlu alan'),
        lessons : yup.array().min(1, 'En az bir ders seçilmelidir').required('Zorunlu alan'),
        about : yup.string().required('Zorunlu alan'),
    })

    const emailSchema = yup.object().shape({
        old_email : yup.string().required('Zorunlu alan'),
        new_email : yup.string().required('Zorunlu alan'),
        new_email_confirm : yup.string().required('Zorunlu alan'),
    })

    const passwordSchema = yup.object().shape({
        old_password : yup.string().required('Zorunlu alan'),
        new_password : yup.string().required('Zorunlu alan'),
        new_password_confirm : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors, control, setValue } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })

    const { handleSubmit : handleSubmitEmail, register: registerEmail, errors: errorsEmail } = useForm({
        resolver: yupResolver(emailSchema)
    })
    
    const { handleSubmit : handleSubmitPassword, register: registerPassword, errors: errorsPassword } = useForm({
        resolver: yupResolver(passwordSchema)
    })
    
    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    const handleSubmitPersonalChange=()=>{
        setUser({...user, lessons: selectedLessons});
    }

    const submitPassword=()=>{
        if(changePasswordUser.new_password!==changePasswordUser.new_password_confirm){
            toast({
                title: 'Hata',
                description: 'Yeni şifre ve yeni şifre tekrar aynı olmalı.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            alert('assd')
        }
    }

    const submitEmail=()=>{
        if(changeEmailUser.new_email!==changeEmailUser.new_email_confirm){
            toast({
                title: 'Hata',
                description: 'Yeni e-posta ve yeni e-posta tekrar aynı olmalı.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }
    
    const handleChange=(event: any)=>{
        setUser({
            ...user,
            image: URL.createObjectURL(event.target.files[0])
        })
    }

    return (
        <>
            <div className='settings-page-container'>
                <Container>
                    <div className="settings-container">
                        <ul className="menu">
                            <li className={`${selectMenu === 1 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(1)}><BiUser className='list-icon' /> <span>Profil</span></li>
                            <li className={`${selectMenu === 2 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(2)}><FiMail className='list-icon' /><span>E-posta</span></li>
                            <li className={`${selectMenu === 3 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(3)}><FiLock className='list-icon' /><span>Şifre</span></li>
                            <li className={`${selectMenu === 4 ? 'menu-item text active' : 'menu-item text'}`} onClick={()=>setSelectMenu(4)}><RiDeleteBin7Line className='list-icon' /><span>Hesabı Kapat</span></li>
                        </ul>
                        <div className="form-container">
                            {
                                selectMenu === 1 && 
                                <form onSubmit={handleSubmit(handleSubmitPersonalChange)}>
                                    <h2 className='sub-title text-center mb-4'>Profil Bilgilerini Güncelle</h2>
                                    <div className="image-update-container">
                                        <div className="image-container mb-3">
                                            <img src={user.image} alt="user"/>
                                        </div>
                                        <input type="file" className='mb-3 sub-text image-input' onChange={(event : any)=>handleChange(event)} />
                                    </div>
                                    <div className='row p-0'>
                                        <Input text='Ad' id='firstName' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={user.firstName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, firstName: event.target.value})}} />
                                        <Input text='Soyad' id='lastName' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={user.lastName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lastName: event.target.value})}} />
                                    </div>
                                    <Input text='Üniversite' id='university' size='sm' variant='flushed' className='mb-3' defaultValue={user.university} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, university: event.target.value})}} />
                                    <Input text='Bölüm' id='department' size='sm' variant='flushed' className='mb-3' defaultValue={user.department} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, department: event.target.value})}} />
                                    <Input text='Meslek' id='job' size='sm' variant='flushed' className='mb-3' defaultValue={user.job} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, job: event.target.value})}} />
                                    <Input text='Ders ücreti' id='lessonPrice' size='sm' variant='flushed' className='mb-3' type='number' defaultValue={user.lessonPrice.toString()} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lessonPrice: parseInt(event.target.value)})}} />
                                    <Autocomplete text='Verdiğin dersler' id='lessons' className='mb-3' options={lessonsArray} defaultValue={lessonsArray.filter(item=> selectedLessons.find(data=> data.id===item.id))} errors={errors} control={control} onChange={(event: any)=>{ setSelectedLessons(event); setValue('lessons', event);}} label='name' value='id' />
                                    <TextArea text='Hakkında' id='about' size='sm' variant='flushed' className='mb-3' defaultValue={user.about} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, about: event.target.value})}} />
                                    <Button text='Profil bilgilerini güncelle' className='button save-button mx-auto mt-1' type='submit' />
                                </form>
                            }
                            {
                                selectMenu === 2 && 
                                <form onSubmit={handleSubmitEmail(submitEmail)}>
                                    <h2 className='sub-title text-center mb-4'>E-posta Güncelle</h2>
                                    <Input text='Güncel e-posta' type='email' id='old_email' selectRef={registerEmail} errors={errorsEmail} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, old_email: event.target.value })}} />
                                    <Input text='Yeni e-posta' type='email' id='new_email' selectRef={registerEmail} errors={errorsEmail} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, new_email: event.target.value })}} />
                                    <Input text='Yeni e-posta tekrar' type='email' id='new_email_confirm' selectRef={registerEmail} errors={errorsEmail} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, new_email_confirm: event.target.value })}} />
                                    <Button text='E-posta güncelle' type='submit' className='button save-button mx-auto mt-3' />
                                </form>
                            }
                            {
                                selectMenu === 3 && 
                                <form onSubmit={handleSubmitPassword(submitPassword)}>
                                    <h2 className='sub-title text-center mb-4'>Şifre Güncelle</h2>
                                    <PasswordInput text='Güncel şifre' id='old_password' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, old_password: event.target.value })}} />
                                    <PasswordInput text='Yeni şifre' id='new_password' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password: event.target.value })}} />
                                    <PasswordInput text='Yeni şifre tekrar' id='new_password_confirm' selectRef={registerPassword} errors={errorsPassword} size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password_confirm: event.target.value })}} />
                                    <Button text='Şifreyi güncelle' type='submit' className='button save-button mx-auto mt-3' />
                                </form>
                            }
                            {
                                selectMenu === 4 && 
                                <div className='remove-account-container'>
                                    <h2 className='sub-title text-center mb-3'>Hesabı Kapat</h2>
                                    <p className='sub-text text-center mb-3'>Hesabı kapatmak istediğinizden emin misiniz ?</p>
                                    <div className="text-center">
                                        <Button text='Hesabı Kapat' showConfirm={true} confirmText={'Hesap bilgileriniz silinecektir. İşlemi yapmak istediğinize emin misiniz ?'} className='button delete-button' />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;