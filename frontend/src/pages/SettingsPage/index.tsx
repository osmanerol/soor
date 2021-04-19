import React, { useState, useEffect } from 'react';
import './index.scss';
import { Input, Autocomplete, TextArea, PasswordInput, Button, Footer } from '../../components';
import { Container } from 'react-bootstrap';
import { Tabs, TabList, Tab, useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 

const Index = () => {
    const [selectMenu, setSelectMenu] = useState(0);
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
    const [changePasswordUser, setChangePasswordUser] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: ''
    });
    const [changeEmailUser, setChangeEmailUser] = useState({
        old_email: '',
        new_email: '',
        new_email_confirm: ''
    });
    const toast = useToast();

    const personalInfoSchema = yup.object().shape({
        firstName: yup.string().required('Zorunlu alan'),
        lastName: yup.string().required('Zorunlu alan'),
        email: yup.string().required('Zorunlu alan'),
        university: yup.string().required('Zorunlu alan'),
        department: yup.string().required('Zorunlu alan'),
        job: yup.string().required('Zorunlu alan'),
        lessonPrice: yup.string().required('Zorunlu alan'),
        lessons: yup.array().min(1, 'En az bir ders seçilmelidir').required('Zorunlu alan'),
        about: yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors, control, setValue } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })

    const { handleSubmit : handleSubmitEmail } = useForm({ })

    const { handleSubmit : handleSubmitPassword } = useForm({ })
    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const handleSubmitPersonalChange=()=>{
        setUser({...user, lessons: selectedLessons});
    }

    const submitPassword=()=>{
        if(changePasswordUser.old_password==='' || changePasswordUser.new_password==='' || changePasswordUser.new_password_confirm===''){
            toast({
                title: 'Hata',
                description: 'Üç alanı da doldurmalısınız.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            // yeni sifre ve tekrarı aynı mı
            if(changePasswordUser.new_password!==changePasswordUser.new_password_confirm){
                toast({
                    title: 'Hata',
                    description: 'Yeni şifre ve yeni şifre tekrar aynı olmalı.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    }

    const submitEmail=()=>{
        if(changeEmailUser.old_email ==='' || changeEmailUser.new_email==='' || changeEmailUser.new_email_confirm===''){
            toast({
                title: 'Hata',
                description: 'Üç alanı da doldurmalısınız.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            // yeni sifre ve tekrarı aynı mı
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
                        <Tabs variant="soft-rounded" colorScheme="blue" size='sm'>
                            <TabList>
                                <Tab onClick={()=>setSelectMenu(0)}>Kişisel Bilgiler</Tab>
                                <Tab onClick={()=>setSelectMenu(1)}>E-posta</Tab>
                                <Tab onClick={()=>setSelectMenu(2)}>Şifre</Tab>
                            </TabList>
                        </Tabs>
                        {
                            selectMenu === 0 &&
                            <form className='row mt-4 p-0 m-0' onSubmit={handleSubmit(handleSubmitPersonalChange)}>
                                <div className="col-md-8 order-md-1 order-2">
                                    <div className='row p-0'>
                                        <Input text='Ad' id='firstName' size='sm' variant='flushed' className='col-md-6 col-12 mb-2' defaultValue={user.firstName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, firstName: event.target.value})}} />
                                        <Input text='Soyad' id='lastName' size='sm' variant='flushed' className='col-md-6 col-12 mb-2' defaultValue={user.lastName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lastName: event.target.value})}} />
                                    </div>
                                <Input text='Üniversite' id='university' size='sm' variant='flushed' className='mb-2' defaultValue={user.university} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, university: event.target.value})}} />
                                <Input text='Bölüm' id='department' size='sm' variant='flushed' className='mb-2' defaultValue={user.department} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, department: event.target.value})}} />
                                <Input text='Meslek' id='job' size='sm' variant='flushed' className='mb-2' defaultValue={user.job} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, job: event.target.value})}} />
                                <Input text='Ders ücreti' id='lessonPrice' size='sm' variant='flushed' className='mb-2' type='number' defaultValue={user.lessonPrice.toString()} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lessonPrice: parseInt(event.target.value)})}} />
                                <Autocomplete text='Verdiğin dersler' id='lessons' className='mb-2' options={lessonsArray} defaultValue={lessonsArray.filter(item=> selectedLessons.find(data=> data.id===item.id))} errors={errors} control={control} onChange={(event: any)=>{ setSelectedLessons(event); setValue('lessons', event);}} label='name' value='id' />
                                <TextArea text='Hakkında' id='about' size='sm' variant='flushed' className='mb-2' defaultValue={user.about} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, about: event.target.value})}} />
                                <Button text='Kişisel bilgileri güncelle' size='sm' className='save-button col-md-6 col-8 p-0 mx-auto mt-1' type='submit' />
                                </div>
                                <div className="col-md-4 order-md-2 order-1">
                                    <div className='image-update-container mb-3'>
                                        <div className='image-container'>
                                            <img src={user.image} alt='teacher'/>
                                        </div>
                                        <Button text='Güncelle' className='image-upload mt-2' size='sm' onClick={()=>{document.getElementById('upload-button')!.click()}} />
                                        <input type='file' id='upload-button' onChange={handleChange} />
                                    </div>
                                </div>
                            </form>
                        }
                        {
                            selectMenu === 1 &&
                            <form className='col-md-8 mt-4' onSubmit={handleSubmitEmail(submitEmail)}>
                                <Input text='Güncel e-posta' type='email' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, old_email: event.target.value })}} />
                                <Input text='Yeni e-posta' type='email' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, new_email: event.target.value })}} />
                                <Input text='Yeni e-posta tekrar' type='email' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangeEmailUser({ ...changeEmailUser, new_email_confirm: event.target.value })}} />
                                <Button text='E-posta güncelle' type='submit' size='sm' className='save-button col-md-6 col-8 p-0 mx-auto mt-3' />
                            </form>
                        }
                        {
                            selectMenu === 2 &&
                            <form className='col-md-8 mt-4' onSubmit={handleSubmitPassword(submitPassword)}>
                                <PasswordInput text='Güncel şifre' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, old_password: event.target.value })}} />
                                <PasswordInput text='Yeni şifre' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password: event.target.value })}} />
                                <PasswordInput text='Yeni şifre tekrar' size='sm' variant='flushed' className='mb-2' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password_confirm: event.target.value })}} />
                                <Button text='Şifreyi güncelle' type='submit' size='sm' className='save-button col-md-6 col-8 p-0 mx-auto mt-3' />
                            </form>
                        }
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Index;