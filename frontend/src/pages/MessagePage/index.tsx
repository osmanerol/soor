import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { MessageBox, Input, Empty } from '../../components';
import { BsSearch } from 'react-icons/bs';
import MessageDetailPage from '../MessageDetailPage';
import { Switch, Route } from 'react-router-dom';

const Index = () => {
    const [messages, setMessages] = useState([
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name: 'Justin Hammer', slug: 'justin-hammer', lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 0},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name: 'Jessica Hammer', slug: 'jessica-jones', lastMessage: 'Lorem ipsum dolar sit amet', status: 0},
        { image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Ashley Jones Hammer', slug: 'ashley-jones', lastMessage: 'Lorem ipsum', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name: 'John Roy', slug: 'john-roy', lastMessage: 'Lorem ipsum dolar sit amet', status: 0},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
    ])

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const searchClick=()=>{
        alert('search clicked');
    }

    return (
        <>
            {
                messages.length > 100 ?
                <div className='message-page-container'>
                    <Container>
                        
                    </Container> 
                </div>:
                <div className='empty-message'>
                    <Empty text='Henüz mesaj geçmişiniz yok.' />
                </div>
            }
        </>
    );
};

export default Index;
/*
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';
import { MessageBox, Input, Empty } from '../../components';
import { BsSearch } from 'react-icons/bs';
import MessageDetailPage from '../MessageDetailPage';
import { Switch, Route } from 'react-router-dom';

const Index = () => {
    const [messages, setMessages] = useState([
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-1-1.jpg', name: 'Justin Hammer', slug: 'justin-hammer', lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 0},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-2.jpg', name: 'Jessica Hammer', slug: 'jessica-jones', lastMessage: 'Lorem ipsum dolar sit amet', status: 0},
        { image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTM1fHxnaXJsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', name: 'Ashley Jones Hammer', slug: 'ashley-jones', lastMessage: 'Lorem ipsum', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/Team-7.jpg', name: 'John Roy', slug: 'john-roy', lastMessage: 'Lorem ipsum dolar sit amet', status: 0},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-3.jpg', name: 'Barbara Hammer', slug: 'barbara-hummer', lastMessage: 'Lorem ipsum dolor consectetur  elit. Quibusdam aut eligendi id culpa nulla quo, corporis saepe, nemo atque dolorum ut iure magni sunt doloribus molestias', status: 1},
        { image: 'https://exponentwptheme.com/startup/wp-content/uploads/sites/12/2019/01/download-5.jpg', name: 'Jason Roy', slug: 'jason-roy', lastMessage: 'Lorem ipsum dolar ', status: 1},
    ])

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])

    const searchClick=()=>{
        alert('search clicked');
    }

    return (
        <div className='message-page-container'>
            {
                messages.length > 0 ?
                <Container>
                    <div className="row">
                        <div className="col-lg-4 col-md-5 messages-users">
                            <Input className='my-3' size='sm' placeholder='Kişi ara' rightIcon={<BsSearch onClick={searchClick}/>} />
                            <div className="messages">
                                {
                                    messages.map((item, index)=>(
                                        <MessageBox key={index} image={item.image} name={item.name} slug={item.slug} lastMessage={item.lastMessage} status={item.status} clickDelete={()=>setMessages(messages.filter((filteredItem, filteredIndex)=>filteredIndex!==index))} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7 d-md-block d-none">
                            <Switch>
                                <Route path='/messages/:detail' strict component={MessageDetailPage} />
                            </Switch>
                        </div>
                    </div>
                </Container> :
                <div className='empty-message'>
                    <Empty text='Henüz mesaj geçmişiniz yok.' />
                </div>
            }
        </div>
    );
};

export default Index;
*/