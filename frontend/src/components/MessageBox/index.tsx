import React, { FC } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Button } from '../index';

interface IDefaultProps{
    image: string,
    name: string,
    slug: string,
    lastMessage: string,
    status: number,
    clickDelete: any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, name, slug, lastMessage, status, clickDelete } = props;
    const history = useHistory();

    return (
        <div className='message-box-container' onClick={()=>history.push(`/messages/${slug}`)}>
            <div className="image-container">
                <img src={image} alt="message-profile"/>
            </div>
            <div className="text-container">
                <p className='name text'>{name}</p>
                <p className={`last-message sub-text status-${status}`}>{lastMessage}</p>
            </div>
            <Button leftIcon={<MdDelete />} className='delete-container' showConfirm={true} confirmText='Konuşmayı silmek istediğinizden emin misiniz ?' onClick={clickDelete} />
            {
                /*
            <div className="delete-container" onClick={clickDelete}>
                <span className='icon'><MdDelete color='#bbb' /></span>
            </div>
                */
            }
        </div>
    );
};

export default Index;