import React from 'react';
import './index.scss';
import { Input, Button } from '../../components';
import { IoSendSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Index = () => {
    const message = [
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet sunt doloribus molestias', date: '11.04.2021-09:00', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vero. Quisquam nisi', date: '11.04.2021-09:01', isOwner: true},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet sunt doloribus molestias sunt doloribus molestias', date: '11.04.2021-09:02', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet', date: '11.04.2021-09:03', isOwner: true},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet', date: '11.04.2021-09:04', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vero. Quisquam nisi', date: '11.04.2021-09:05', isOwner: true},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet sunt doloribus molestias', date: '11.04.2021-09:00', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vero. Quisquam nisi', date: '11.04.2021-09:01', isOwner: true},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet sunt doloribus molestias sunt doloribus molestias', date: '11.04.2021-09:02', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet', date: '11.04.2021-09:03', isOwner: true},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', message: 'Lorem ipsum dolar sit amet', date: '11.04.2021-09:04', isOwner: false},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-4.jpg', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vero. Quisquam nisi', date: '11.04.2021-09:05', isOwner: true},
    ]

    return (
        <div className='message-detail-page-container'>
            <div className="name-container mt-3">
                <p className='name'>Justin Hammer</p>
                <Button size='sm' text='X' className='back-button d-md-none d-block' as={Link} to='/messages' />
            </div>
            <div className="message-container my-2">
                {
                    message.map((item, index)=>(
                        <div key={index} className={item.isOwner ? 'message-item-isowner mr-1' : 'message-item ml-1'}>
                            {
                                !item.isOwner && 
                                <div className="image-container mr-1">
                                    <img src={item.image} alt="message-profile"/>
                                </div>
                            }
                            <div className="text-container">
                                <p className='message-text sub-text'>{item.message}</p>
                                <small className='message-date float-right'>{item.date}</small>
                            </div>
                            {
                                item.isOwner && 
                                <div className="image-container ml-1">
                                    <img src={item.image} alt="message-profile"/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className="send-message-input">
                <Input className='input' size='sm' placeholder='mesaj yaz' />
                <Button className='button' size='sm' leftIcon={<IoSendSharp />} />
            </div>
        </div>
    );
};

export default Index;