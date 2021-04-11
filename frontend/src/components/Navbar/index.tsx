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
            <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={toggleExpanded} className={`${(lessonNotification > 0 || messageNotification > 0) && 'notification'}`}></Navbar.Toggle>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto' onClick={isSmallScreen ? toggleExpanded : ()=>{}}>
                    <Nav.Link as={Link} to='/all-instructors'>Eğitmenler</Nav.Link>
                    {
                        isLoggedIn ? 
                        <>
                            <Nav.Link as={Link} to='/add-balance'>Bakiye Yükle</Nav.Link>
                            <Nav.Link as={Link} to='/lessons' className={`${lessonNotification > 0 && 'notification'}`}>Derslerim</Nav.Link>
                            <Nav.Link as={Link} to='/messages' className={`${messageNotification > 0 && 'notification'}`}>Mesajlar</Nav.Link>
                            {
                                isSmallScreen ?
                                <>
                                    <Nav.Link as={Link} to='/settings'>Ayarlar</Nav.Link>
                                    <Nav.Link as={Link} to='/instructor/jessica-jones'>Profil</Nav.Link>
                                    <Nav.Link as={Link} to='/'>Çıkış Yap</Nav.Link>
                                </> : 
                                <NavDropdown title={<span className='image-container'><img src='https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg' alt='profile' className='profile-image' /></span>} id='nav-dropdown'>
                                    <NavDropdown.Item as={Link} to='/settings'>Ayarlar</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/instructor/jessica-jones'>Profil</NavDropdown.Item>
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