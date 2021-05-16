import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useToast } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import logo from '../../assets/images/logo.png';
import DefaultProfile from '../../assets/images/defaultProfile.png';
import cx from 'classnames';
import UserStore from '../../application/user/store/userStore';

interface IDefaultProps {
    UserStore? : typeof UserStore;
}

const Index : FC<IDefaultProps> = inject('UserStore')(observer((props : IDefaultProps) => {
    const { UserStore : store } = props;
    const history = useHistory();
    const [lessonNotification, setLessonNotification] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const toast = useToast();
    
    useEffect(()=>{
        resizeListener();
    })

    useEffect(()=>{
        window.addEventListener('resize', resizeListener);
        setLessonNotification(0);
    }, [])

    const resizeListener=()=>{
        if(window.innerWidth<992){
            setIsSmallScreen(true);
        }
        else{
            setIsSmallScreen(false);
        }
    }

    const toggleExpanded=()=>{
        setIsExpanded(!isExpanded);
    }

    const onLogOut=()=>{
        store!.logout();
        toast({
            title: 'Çıkış başarılı',
            description: 'Anasayfaya yönlendiriliyorsunuz.',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        setTimeout(()=>{
            history.push('/');
        }, 2000);
    }

    return (
        <Navbar expand='lg' fixed='top' expanded={isExpanded}>
            <Container>
                <Navbar.Brand as={Link} to='/'><img src={logo} alt='logo' /><span className='navbar-brand-text'>Soor</span></Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={toggleExpanded} className={`${(lessonNotification > 0) && 'notification'}`}></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto' onClick={isSmallScreen ? toggleExpanded : ()=>{}}>
                        <Nav.Link as={Link} to='/lesson-filter'>Ders Seç</Nav.Link>
                        {
                            store!.baseUser.id !== 0 ? 
                            <>
                                <Nav.Link as={Link} to='/lessons' className={cx({'notification' : lessonNotification > 0})} >Derslerim</Nav.Link>
                                {
                                    isSmallScreen ?
                                    <>
                                        <Nav.Link as={Link} to='/balance'>Bakiye</Nav.Link>
                                        {
                                            store!.baseUser.userType === 2 &&
                                            <Nav.Link as={Link} to={`/instructor/${store?.baseUser.slug}`}>Profil</Nav.Link>
                                        }
                                        <Nav.Link as={Link} to={localStorage.getItem('userType') === '1' ? '/settings/student' : '/settings/instructor'}>Ayarlar</Nav.Link>
                                        <Nav.Link as={Link} to='/'>Çıkış Yap</Nav.Link>
                                    </> : 
                                    <NavDropdown title={<div className='navbar-dropdown-name'><span className='image-container'><img src={store?.baseUser.image === '' || store?.baseUser.image === null ? DefaultProfile : store?.baseUser.image} alt='profile' className='profile-image' /></span><span className='navbar-name'>{store!.baseUser.first_name} {store!.baseUser.last_name}</span></div>} id='nav-dropdown'>
                                        <NavDropdown.Item as={Link} to='/balance'>Bakiye</NavDropdown.Item>
                                        {
                                            store!.baseUser.userType === 2 &&
                                            <NavDropdown.Item as={Link} to={`/instructor/${store?.baseUser.slug}`}>Profil</NavDropdown.Item>
                                        }
                                        <NavDropdown.Item as={Link} to={localStorage.getItem('userType') === '1' ? '/settings/student' : '/settings/instructor'}>Ayarlar</NavDropdown.Item>
                                        <NavDropdown.Item onClick={onLogOut}>Çıkış Yap</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </> : 
                            <>
                                <Nav.Link as={Link} to='/login'>Giriş Yap</Nav.Link>
                                <Nav.Link as={Link} to='/signup'>Kaydol</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}));

export default Index;
/*

    <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={toggleExpanded} className={`${(lessonNotification > 0 || messageNotification > 0) && 'notification'}`}></Navbar.Toggle>
*/