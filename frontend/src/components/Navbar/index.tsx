import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isTop, setIsTop] = useState(true);

    useEffect(()=>{
        window.addEventListener('scroll', setYOffset)
        setIsLoggedIn(false);
    }, [])

    const setYOffset=()=>{
        setIsTop(window.pageYOffset === 0 ? true : false);
    }

    return (
        <Navbar expand="md" fixed='top' className={!isTop ? 'shadow' : ''}>
            <Container>
                <Navbar.Brand as={Link} to='/'><img src={logo} alt="logo"/><span>Soor</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {
                            isLoggedIn ? 
                            <>
                                <Nav.Link as={Link} to='/login'>Giriş Yap</Nav.Link>
                                <Nav.Link as={Link} to='/signup'>Kaydol</Nav.Link>
                            </> :
                            <>
                                <Nav.Link as={Link} to='/login' className='login-button'>Giriş Yap</Nav.Link>
                                <Nav.Link as={Link} to='/signup' className='signup-button'>Kaydol</Nav.Link>
                            </> 
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Index;