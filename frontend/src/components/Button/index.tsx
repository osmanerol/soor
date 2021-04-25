import React, { FC } from 'react';
import './index.scss';
import { Button, useDisclosure } from '@chakra-ui/react';
import { ConfirmModal } from '../index';
/*
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 
*/

interface IDefaultProps{
    className?: string,
    text?: string,
    size?: string,
    variant?: string,
    leftIcon?: any,
    rightIcon?: any,
    onClick?: any,
    disabled?: boolean,
    as?: any,
    to?: string,
    type?: any,
    showConfirm?: boolean
    confirmText?: string
}

const Index : FC<IDefaultProps> = (props: IDefaultProps) => {
    const { className, text, size, variant, leftIcon, rightIcon, onClick=()=>{}, disabled=false, as, to, type='button', showConfirm, confirmText='İşlemi yapmak istediğinize emin misiniz?' } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className={`${className}`}>
                <Button type={type} leftIcon={leftIcon} rightIcon={rightIcon} variant={variant} size={size} className='w-100' onClick={showConfirm ? onOpen : onClick} disabled={disabled} as={as} to={to}>
                    {text}
                </Button>
            </div>
            {
                showConfirm && <ConfirmModal confirmText={confirmText} isOpen={isOpen} onClose={onClose} onClick={onClick} />
            }
        </>
    );
};

export default Index;