import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Footer, CommentDetail, Input, PasswordInput, TextArea, Autocomplete, TakeLessonModal } from '../../components';
import { Container } from 'react-bootstrap';
import { StarIcon } from '@chakra-ui/icons';
import { useToast } from  '@chakra-ui/react';
import { FiMessageSquare } from 'react-icons/fi';
import { GrUpdate, GrDocumentUpdate } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Index = () => {
    const [isOwner, setIsOwner] = useState(false);
    const [isEdit, setIsEdit] = useState(false); 
    const [user, setUser] = useState({
        image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg',
        firstName: 'Jessica',
        lastName: 'Jones',
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
    const toast = useToast();

    const comments = [
        { image: 'https://images.unsplash.com/photo-1600603405959-6d623e92445c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Vickly Hladynets', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus quisquam quidem iusto totam porro quod vel, ad sapiente sunt nobis nulla cumque veniam, ipsum possimus, ut accusamus!', date: '15.03.2020'},
        { image: 'https://images.unsplash.com/photo-1468011749792-10026eb12caf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzd8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Allef Moyr', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.', date: '13.04.2020'},
        { image: 'https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Elizeus Diaz', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.', date: '13.04.2020'},
        { image: 'https://images.unsplash.com/photo-1605038593290-475661bfbba3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Amir Babei', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.Dolores molestiae dignissimos doloribus quisquam quidem iusto totam porro quod vel, ad sapiente sunt nobis nulla cumque veniam,', date: '20.06.2020'},
        { image: 'https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODl8fGdpcmx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Ashley Roy', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestiae dignissimos doloribus.Dolores molestiae dignissimos.', date: '08.01.2020'},
    ]

    const personalInfoSchema = yup.object().shape({
        firstName: yup.string().required('Zorunlu alan'),
        lastName: yup.string().required('Zorunlu alan'),
        email: yup.string().required('Zorunlu alan'),
        university: yup.string().required('Zorunlu alan'),
        job: yup.string().required('Zorunlu alan'),
        lessonPrice: yup.string().required('Zorunlu alan'),
        lessons: yup.array().min(1, 'En az bir ders seçilmelidir').required('Zorunlu alan'),
        about: yup.string().required('Zorunlu alan'),
    })

    const { handleSubmit, register, errors, control, setValue } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })
    
    useEffect(()=>{
        setIsOwner(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const handleSubmitPersonalChange=()=>{
        setUser({...user, lessons: selectedLessons});
        setIsEdit(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const handleSubmitPasswordChange=()=>{
        if(changePasswordUser.old_password==='' || changePasswordUser.new_password==='' || changePasswordUser.new_password_confirm===''){
            toast({
                title: "Hata",
                description: "Üç alanı da doldurmalısınız.",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
        else{
            // yeni sifre ve tekrarı aynı mı
            if(changePasswordUser.new_password!==changePasswordUser.new_password_confirm){
                toast({
                    title: "Hata",
                    description: "Yeni şifre ve yeni şifre tekrar aynı olmalı.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
            else{
                window.scrollTo({top: 0, behavior: 'smooth'});
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
            <div className='teacher-profile-page-container'>
                <div className="cover">
                    <Container className='h-100'>
                        { 
                            ( isOwner && !isEdit ) && <Button text='' size='sm' leftIcon={<GrUpdate />} className='update-button' onClick={()=>{setIsEdit(true)}} />
                        }
                    </Container>
                 </div>
                {
                    isEdit ?
                    <Container className='update-form'>
                        <div className="row p-0 m-0">
                            <div className="col-md-6 my-3">
                                <p className='update-form-title mb-3'>Kişisel Bilgiler</p>
                                <form onSubmit={handleSubmit(handleSubmitPersonalChange)}>
                                    <div className="image-update-container mb-3">
                                        <div className="image-container">
                                            <img src={user.image} alt="teacher"/>
                                        </div>
                                        <Button text='' leftIcon={<GrDocumentUpdate />} className='image-upload' size='sm' onClick={()=>{document.getElementById('upload-button')!.click()}} />
                                        <input type="file" id='upload-button' onChange={handleChange} />
                                    </div>
                                    <div className="row p-0">
                                        <Input text='Ad' id='firstName' variant='flushed' className='col-md-6 col-12' defaultValue={user.firstName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, firstName: event.target.value})}} />
                                        <Input text='Soyad' id='lastName' variant='flushed' className='col-md-6 col-12' defaultValue={user.lastName} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lastName: event.target.value})}} />
                                    </div>
                                    <Input text='E-posta' id='email' variant='flushed' defaultValue={user.email} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, email: event.target.value})}} />
                                    <Input text='Üniversite' id='university' variant='flushed' defaultValue={user.university} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, university: event.target.value})}} />
                                    <Input text='Meslek' id='job' variant='flushed' defaultValue={user.job} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, job: event.target.value})}} />
                                    <Input text='Ders ücreti' id='lessonPrice' variant='flushed' type='number' defaultValue={user.lessonPrice.toString()} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, lessonPrice: parseInt(event.target.value)})}} />
                                    <Autocomplete text='Verdiğin dersler' id='lessons' options={lessonsArray} defaultValue={lessonsArray.filter(item=> selectedLessons.find(data=> data.id===item.id))} errors={errors} control={control} onChange={(event: any)=>{ setSelectedLessons(event); setValue('lessons', event);}} label='name' value='id' />
                                    <TextArea text='Hakkında' id='about' variant='flushed' defaultValue={user.about} selectRef={register} errors={errors} onChange={(event: any)=>{setUser({...user, about: event.target.value})}} />
                                    <Button text='Kişisel bilgileri güncelle' size='sm' className='save-button col-md-6 col-8 p-0 mx-auto mt-1' type='submit' />
                                </form>
                            </div>
                            <div className="col-md-6 my-3 ">
                                <p className='update-form-title mb-3'>Parola Bilgileri</p>
                                <form onSubmit={handleSubmit(handleSubmitPasswordChange)}>
                                    <PasswordInput text='Güncel şifre' variant='flushed' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, old_password: event.target.value })}} />
                                    <PasswordInput text='Yeni şifre' variant='flushed' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password: event.target.value })}} />
                                    <PasswordInput text='Yeni şifre tekrar' variant='flushed' onChange={(event: any)=>{setChangePasswordUser({ ...changePasswordUser, new_password_confirm: event.target.value })}} />
                                    <Button text='Şifreyi güncelle' onClick={()=>{}} size='sm' className='save-button col-md-6 col-8 p-0 mx-auto mt-2' type='submit' />
                                </form>
                            </div>
                        </div>
                    </Container> :
                    <>
                        <div className="personal-info-container">
                            <Container>
                                <div className="image-container">
                                    <img src={user.image} alt="teacher"/>
                                </div>
                                <div className="text-info-container">
                                    <p className='name'>{user.firstName} {user.lastName}</p>
                                    <p className='text'>{user.job}</p>
                                    <div className="education-info-container">
                                        <small className='text-muted'>{user.university}</small>
                                        <small className='text-muted'>{user.department}</small>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <Container className='about-container'>
                            <div className="row pb-2">
                                <div className="col-lg-3 col-md-4 col-12 mx-auto mt-4">
                                    <div className="numeric-info-container">
                                        <div className="items">
                                            <div className="item">
                                                <p className='item-number'>{user.totalLesson}</p>
                                                <p className='item-text'>DERS</p>
                                            </div>
                                            <div className="item">
                                                <p className='item-number'>{user.totalComment}</p>
                                                <p className='item-text'>YORUM</p>
                                            </div>
                                            <div className="item">
                                                <p className='item-number'>{user.lessonPrice} TL</p>
                                                <p className='item-text'>ÜCRET</p>
                                            </div>
                                        </div>
                                        <div className="rate my-3">
                                            <p className='rate-number'>{user.rate}</p>
                                            <small>
                                                {Array(5)
                                                    .fill('')
                                                    .map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        color={i < user.rate ? 'yellow.400' : 'gray.300'}
                                                    />
                                                ))}
                                            </small>
                                        </div>
                                        <Button text='Mesaj at' leftIcon={<FiMessageSquare />} size='sm' className='send-message-button my-3' />
                                        <TakeLessonModal lessons={user.lessons} lessonPrice={user.lessonPrice} />
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 mt-4">
                                    <div className="about-text-container">
                                        <p className='about-title mb-2'>Verdiği Dersler</p>
                                        <ul>
                                            { user.lessons.map(item=>(
                                                <li key={item.id} className='text'>{item.name}</li>
                                            ))}
                                        </ul>
                                        <hr className='my-3'/>
                                        <p className='about-title mb-2'>Hakkında</p>
                                        <p className='text'>{user.about}</p>
                                    </div>
                                    <div className="student-comments-container my-3">
                                        <p className='about-title mb-3'>Öğrenci Yorumları</p>
                                        {
                                            comments.length > 0 ? 
                                            <div>
                                                {
                                                    comments.map((item : any)=>(
                                                        <CommentDetail image={item.image} name={item.name} content={item.content} date={item.date} key={item.image} />
                                                    ))
                                                }
                                                <Button text='Daha fazla yükle' className='col-lg-5 col-md-8 col-12 mx-auto my-2 load-more-button' size='sm' />
                                            </div> :
                                            <p className='text'>Henüz yorum yapılmamış.</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </>
                }
            </div>
            <Footer />
        </>
    );
};

export default Index;