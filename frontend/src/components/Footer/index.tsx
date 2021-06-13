import React from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
//import { GrTwitter, GrLinkedin, GrInstagram } from 'react-icons/gr';

const Index = () => {
    return (
        <div className='footer-container'>
            <Container>
                <div className='items-container'>
                    <div className='about'>
                        <Heading as='h6' size='sm'>Kurumsal</Heading>
                        <ul>
                            <li><Link to='/about' className='sub-text'>Hakkımızda</Link></li>
                            <li><Link to='/agreement' className='sub-text'>Üyelik Sözleşmesi</Link></li>
                            {
                                /*
                                    <li><Link to='/' className='sub-text'>Gizlilik Sözleşmesi</Link></li>
                                    <li><Link to='/' className='sub-text'>Kullanıcı Yorumları</Link></li>
                                */
                            }
                        </ul>
                    </div>
                    <div className='personel'>
                        <div>
                            <Heading as='h6' size='sm'>Bireysel</Heading>
                            <ul>
                                <li><Link to='/login' className='sub-text'>Giriş Yap</Link></li>
                                <li><Link to='/signup' className='sub-text'>Kaydol</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='contact'>
                        <Heading as='h6' size='sm'>İletişim</Heading>
                        <ul>
                            <li><a href='mailto:info@soor.com' className='sub-text'><GrMail className='icon' /> Mail</a></li>
                            {
                                /*
                                    <li><Link to='/' className='sub-text'><GrTwitter className='icon' />Twitter</Link></li>
                                    <li><Link to='/' className='sub-text'><GrLinkedin className='icon' />LinkedIn</Link></li>
                                    <li><Link to='/' className='sub-text'><GrInstagram className='icon' />Instagram</Link></li>
                                */
                            }
                        </ul>
                    </div>
                </div>
                <div className='text-center copyright'>
                    <small>Soor 2021 © Tüm hakları saklıdır</small>
                </div>
            </Container>
        </div>
    );
};

export default Index;

/*import React from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GrMail, GrTwitter, GrLinkedin, GrInstagram } from 'react-icons/gr';

const Index = () => {
    return (
        <div className='footer-container'>
            <Container>
                <div className='items-container'>
                    <div className='about'>
                        <div className='items'>
                            <Heading as='h6' size='sm'>Kurumsal</Heading>
                            <ul>
                                <li><Link to='/'>Hakkımızda</Link></li>
                                <li><Link to='/'>Üyelik Sözleşmesi</Link></li>
                                <li><Link to='/'>Gizlilik Sözleşmesi</Link></li>
                                <li><Link to='/'>Kullanıcı Yorumları</Link></li>
                            </ul>
                        </div>
                        <div className='items'>
                            <Heading as='h6' size='sm'>Bireysel</Heading>
                            <ul>
                                <li><Link to='/login'>Giriş Yap</Link></li>
                                <li><Link to='/signup'>Kaydol</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='contact'>
                        <div>
                            <Heading as='h6' size='sm'>İletişim</Heading>
                            <ul>
                                <li><a href='mailto:info@soor.com'><GrMail className='icon' /> Mail</a></li>
                                <li><Link to='/'><GrTwitter className='icon' />Twitter</Link></li>
                                <li><Link to='/'><GrLinkedin className='icon' />LinkedIn</Link></li>
                                <li><Link to='/'><GrInstagram className='icon' />Instagram</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='text-center copyright'>
                    <small>Soor 2021 © Tüm hakları saklıdır</small>
                </div>
            </Container>
        </div>
    );
};

export default Index;
*/