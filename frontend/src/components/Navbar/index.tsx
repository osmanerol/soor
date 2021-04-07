import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lessonNotification, setLessonNotification] = useState(0);
    const [messageNotification, setMessageNotification] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(()=>{
        resizeListener();
    })

    useEffect(()=>{
        window.addEventListener('resize', resizeListener);
        setIsLoggedIn(true);
        setLessonNotification(2);
        setMessageNotification(3); 
    }, [])

    const resizeListener=()=>{
        if(window.innerWidth<=768){
            setIsSmallScreen(true);
        }
        else{
            setIsSmallScreen(false);
        }
    }

    const toggleExpanded=()=>{
        setIsExpanded(!isExpanded);
    }

    return (
        <Navbar expand='md' fixed='top' expanded={isExpanded}>
            <Container>
            <Navbar.Brand as={Link} to='/'><img src={logo} alt='logo' /><span className='navbar-brand-text'>Soor</span></Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={toggleExpanded} className={`${(lessonNotification > 0 || messageNotification > 0) && 'notification'}`}/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto' onClick={isSmallScreen ? toggleExpanded : ()=>{}}>
                    <Nav.Link as={Link} to='/lesson-filter-page'>Filtrele</Nav.Link>
                    {
                        isLoggedIn ? 
                        <>
                            <Nav.Link as={Link} to='/add-balance'>Bakiye Yükle</Nav.Link>
                            <Nav.Link as={Link} to='/lessons' className={`${lessonNotification > 0 && 'notification'}`}>Derslerim</Nav.Link>
                            <Nav.Link as={Link} to='/messages' className={`${messageNotification > 0 && 'notification'}`}>Mesajlar</Nav.Link>
                            {
                                isSmallScreen ?
                                <>
                                    <Nav.Link as={Link} to='/teacher/jessica-jones'>Profil</Nav.Link>
                                    <Nav.Link as={Link} to='/'>Çıkış Yap</Nav.Link>
                                </> : 
                                <NavDropdown title='Jessica Jones' id='nav-dropdown'>
                                    <NavDropdown.Item as={Link} to='/teacher/jessica-jones'>Profil</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/'>Çıkış Yap</NavDropdown.Item>
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
};

export default Index;
/*
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container, Navbar, Nav, Form, NavDropdown } from 'react-bootstrap';
import { Input } from '../index';
import { Link } from 'react-router-dom';
import { Search2Icon, HamburgerIcon } from '@chakra-ui/icons';
import { Drawer,  DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiMessageSquareDetail, BiUser, BiLogOutCircle, BiLogInCircle } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { GrMail, GrTwitter, GrLinkedin, GrInstagram } from 'react-icons/gr';
import logo from '../../assets/images/logo.png';

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isTop, setIsTop] = useState(true);
    const [notification, setNotification] = useState(0);
    const [message, setMessage] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(()=>{
        window.addEventListener('scroll', setYOffset)
        setIsLoggedIn(true);
        setNotification(2);
        setMessage(3); 
    }, [])

    const setYOffset=()=>{
        setIsTop(window.pageYOffset === 0 ? true : false);
    }

    return (
        <Navbar expand='md' fixed='top' className={!isTop ? 'shadow' : ''}>
            <Container>
                <Navbar.Brand as={Link} to='/'><img src={logo} alt='logo'/><span>Soor</span></Navbar.Brand>
                <div className='d-md-none d-block' onClick={onOpen}>
                    <HamburgerIcon w={7} h={7} />
                </div>
                <Navbar.Collapse id='navbar-nav'>
                    <Form inline className='ml-auto navbar-form'>
                        <Input placeholder='Ara' background='#f2f6fc' rightIcon={<Search2Icon color='gray' />} />
                    </Form>
                    <Nav className='ml-auto'>
                        {
                            isLoggedIn ? 
                            <>
                                <NavDropdown title={<div className='profile-image-container'>
                                    <img src='https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg' alt='navbar-profile-pic' className='navbar-image' />
                                    { (notification > 0 || message > 0) && <span className='notification-alert' /> }
                                    </div>} id='nav-dropdown' className='navbar-dropdown' aria-expanded='true' show={isHover} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
                                    <NavDropdown.Item as={Link} to='/'><IoMdNotificationsOutline className='mr-2' />Bildirimler { notification > 0 && <small className='notification'>{ notification }</small>}</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/'><BiMessageSquareDetail className='mr-2' />Mesajlar { message > 0 && <small className='notification'>{ message }</small> }</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/teacher/jessica-jones'><BiUser className='mr-2' />Profil</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/'><BiLogOutCircle className='mr-2' />Çıkış Yap</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to='/login' className='login-button'>Giriş Yap</Nav.Link>
                                <Nav.Link as={Link} to='/signup' className='signup-button'>Kaydol</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                <Drawer isOpen={isOpen} placement='right' onClose={onClose} >
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>MENÜ</DrawerHeader>
                            <DrawerBody>
                                <Form inline className='ml-auto navbar-form mb-3'>
                                    <Input placeholder='Ara' background='#f2f6fc' className='w-100' rightIcon={<Search2Icon color='gray' />} />
                                </Form>
                                <nav className='ml-auto'>
                                    {
                                        isLoggedIn ? 
                                        <>
                                            <Nav.Link as={Link} to='/' className='mb-3'><IoMdNotificationsOutline className='mr-2' />Bildirimler</Nav.Link>
                                            <Nav.Link as={Link} to='/' className='mb-3'><BiMessageSquareDetail className='mr-2' />Mesajlar</Nav.Link>
                                            <Nav.Link as={Link} to='/teacher/jessica-jones' className='mb-3' onClick={onClose}><BiUser className='mr-2' />Profil</Nav.Link>
                                            <Nav.Link as={Link} to='/' className='mb-3' onClick={onClose}><BiLogOutCircle className='mr-2' />Çıkış Yap</Nav.Link>
                                        </>
                                        :
                                        <>
                                            <Nav.Link as={Link} to='/login' className='mb-3' onClick={onClose}><BiLogInCircle className='mr-2' />Giriş Yap</Nav.Link>
                                            <Nav.Link as={Link} to='/signup' className='mb-3' onClick={onClose}><AiOutlineUserAdd className='mr-2' />Kaydol</Nav.Link>
                                        </>
                                    }
                                    <div className='icons-container'>
                                        <div className='item'>
                                            <GrMail />
                                        </div>
                                        <div className='item'>
                                            <GrTwitter />
                                        </div>
                                        <div className='item'>
                                            <GrLinkedin />
                                        </div>
                                        <div className='item'>
                                            <GrInstagram />
                                        </div>
                                    </div>
                                </nav>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            </Container>
        </Navbar>
    );
};

export default Index;
*/