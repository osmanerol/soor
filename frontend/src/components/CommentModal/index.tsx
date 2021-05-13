import React, { FC, useEffect } from 'react';
import './index.scss';
import { Button } from '../index';
import { observer, inject } from 'mobx-react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { TextArea } from '../index';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import cx from 'classnames';
import CommentStore from '../../application/comment/store/commentStore';

interface IDefaultProps{
    CommentStore? : typeof CommentStore,
    isOpen : any,
    onClose : any
}

const Index : FC<IDefaultProps> = inject('CommentStore')(observer((props : IDefaultProps) => {
    const { CommentStore : store, isOpen, onClose } = props;
    const history = useHistory();
    const toast = useToast();

    useEffect(() => {
        store!.createEmptyComment();
    }, [store])

    const personalInfoSchema = yup.object().shape({
        content : yup.string().required('Zorunlu alan')
    })

    const { handleSubmit, register, errors } = useForm({
        resolver: yupResolver(personalInfoSchema)
    })

    const submitComment=()=>{
        onClose();
        toast({
            title: 'Bilgi',
            description: 'Görüşme sonlandı. Anasayfaya yönlendiriliyorsunuz.',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
        setTimeout(()=>{
            history.push('/');
        }, 2000)
    }

    return (
        <div>
            <Modal onClose={onClose} size={'xl'} isOpen={isOpen }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Eğitmeni Puanla</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(submitComment)}>
                        <ModalBody>
                                <p className='sub-text'>Puan :</p>
                                <div className='point'>
                                    {
                                        Array(5).fill(null).map((item : any, index : number) =>
                                        <span className={cx('item text', { 'active' : index < store!.comment.point })} key={index} onClick={()=>{ store!.comment.point = index+1 }}>{index+1}</span>)
                                    }
                                </div>
                                <p className='sub-text'>Yorum :</p>
                                <TextArea id='content' selectRef={register} errors={errors} onChange={(event : any)=>{ store!.comment.content = event.target.value }} />
                        </ModalBody>    
                        <ModalFooter>
                            <Button text='Vazgeç' size='sm' className='cancel-button' onClick={onClose} />
                            <Button text='Gönder' size='sm' className='send-button' type='submit' />
                        </ModalFooter>
                        </form>
                </ModalContent>
            </Modal>
        </div>
    );
})) ;

export default Index;