import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Input, Autocomplete, TextArea, PasswordInput, Spinner, Button, Footer } from '../../components';
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
import InstructorStore from '../../application/instructor/store/instructorStore';
import UserStore from '../../application/user/store/userStore';
import LectureStore from '../../application/lecture/store/lectureStore';

interface IDefaultProps{
    InstructorStore? : typeof InstructorStore,
    UserStore? : typeof UserStore,
    LectureStore? : typeof LectureStore,
}

const Index : FC<IDefaultProps> = inject('InstructorStore', 'UserStore', 'LectureStore')(observer((props : IDefaultProps) => {
    const { InstructorStore : store, UserStore : userStore, LectureStore : lectureStore } = props;
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
        university : yup.string().required('Zorunlu alan'),
        department : yup.string().required('Zorunlu alan'),
        job : yup.string().required('Zorunlu alan'),
        lessonPrice : yup.string().required('Zorunlu alan'),
        lessons : yup.array().min(1, 'En az bir ders seçilmelidir').required('Zorunlu alan'),
        about : yup.string().required('Zorunlu alan'),
    })

    const passwordSchema = yup.object().shape({
        old_password : yup.string().required('Zorunlu alan'),
        new_password1 : yup.string().required('Zorunlu alan'),
        new_password2 : yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors, control, setValue } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })

    const { handleSubmit : handleSubmitPassword, register: registerPassword, errors: errorsPassword } = useForm({
        resolver: yupResolver(passwordSchema)
    })

    useEffect(() => {
        document.title = 'Soor - Ayarlar';
        window.scrollTo(0,0);
    }, [])

    useEffect(()=>{
        if(localStorage.getItem('userType') !== '2'){
            history.push('/');
        }
        const getInstructor = async () => {
            await store!.getProfile();
        }
        const getLecture = async () => {
            await lectureStore!.getAllLectures();
        }
        getInstructor();
        if(lectureStore!.lectureList.results.length === 0){
            getLecture();
        }
    }, [store, lectureStore, history])
    

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
            userStore!.baseUser.first_name = store!.instructor.first_name;
            userStore!.baseUser.last_name = store!.instructor.last_name;
            userStore!.baseUser.image = store!.instructor.instructor.image;
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
            store!.instructor.instructor.image = file;
        }
    }

    return (
        <>
            {
                (store?.isLoading  || lectureStore?.lectureList.isLoading) ?
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
                                                    <img src={(store!.instructor.instructor.image === '' || store!.instructor.instructor.image === null) ? DefaultProfile : tempImage === '' ? store!.instructor.instructor.image : tempImage} alt="user"/>
                                                </div>
                                                <input type="file" className='mb-3 sub-text image-input' onChange={(event : any)=>handleChange(event)} />
                                            </div>
                                            <div className='row p-0'>
                                                <Input text='Ad' id='first_name' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={store!.instructor.first_name} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.first_name = event.target.value} />
                                                <Input text='Soyad' id='last_name' size='sm' variant='flushed' className='col-md-6 col-12 mb-3' defaultValue={store!.instructor.last_name} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.first_name = event.target.value} />
                                            </div>
                                            <Input text='E-posta' id='email' type='email' size='sm' variant='flushed' className='mb-3' defaultValue={store!.instructor.email} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.email = event.target.value } />
                                            <Input text='Üniversite' id='university' size='sm' variant='flushed' className='mb-3' defaultValue={store!.instructor.instructor.university} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.instructor.university = event.target.value } />
                                            <Input text='Bölüm' id='department' size='sm' variant='flushed' className='mb-3' defaultValue={store!.instructor.instructor.department} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.instructor.department = event.target.value } />
                                            <Input text='Meslek' id='job' size='sm' variant='flushed' className='mb-3' defaultValue={store!.instructor.instructor.job} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.instructor.job = event.target.value} />
                                            <Input text='Ders ücreti' id='lessonPrice' size='sm' variant='flushed' className='mb-3' type='number' defaultValue={store!.instructor.instructor.lessonPrice.toString()} selectRef={register} errors={errors} onChange={(event : any)=>store!.instructor.instructor.lessonPrice = parseInt(event.target.value)} />
                                            <Autocomplete text='Verdiğin dersler' id='lessons' className='mb-3' options={lectureStore!.lectureList.results} defaultValue={lectureStore!.lectureList.results.filter((item : any)=> store!.instructor.instructor.lectures.find((data : any)=> data === item.id))} errors={errors} control={control} onChange={(event: any)=>{ store!.instructor.instructor.lectures = event ; setValue('lessons', event);}} label='name' value='id' />
                                            <TextArea text='Hakkında' id='about' size='sm' variant='flushed' className='mb-3' defaultValue={store!.instructor.instructor.about} selectRef={register} errors={errors} onChange={(event: any)=>store!.instructor.instructor.about = event.target.value} />
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
                    <Footer />
                </>
            }
        </>
    );
}));

export default Index;

    /*
    const [user, setUser] = useState({
        image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg',
        first_name: 'Jessica',
        last_name: 'Jones',
        status: 1,
        job: 'Fizik Öğretmeni',
        email: 'jessicajones@gmail.com',
        university: 'İstanbul Üniversitesi Cerrahpaşa',
        department: 'Fizik Öğretmenliği',
        rate: 4.1,
        totalLesson: 22, 
        lessonPrice: 80,
        totalComment: 30,
        lessons: [{id: 1, name: 'Fizik'}, {id: 2, name: 'Matematik'}, {id: 3, name: 'Geometri'}],
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloremque reprehenderit excepturi voluptatem in odit quas mollitia! Recusandae doloremque sed necessitatibus doloribus voluptas corrupti iste rerum, nemo repellat incidunt expedita.Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis iste, dolorum, quaerat suscipit sed provident quisquam dignissimos, minus velit sit quae nihil asperiores officia fugiat accusamus non cum! Ullam, soluta!'
    });
    const [selectedLessons, setSelectedLessons] = useState(user.lessons);
    const lessonsArray=[{id: 0, name: 'Fizik'}, { id: 1, name: 'Matematik'}, { id: 2, name: 'Geometri'}, { id: 3, name: 'Kimya'}, { id: 4, name: 'Edebiyat'}, { id: 5, name: 'Tarih'}];
    */