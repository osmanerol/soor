import React, { FC } from 'react';
import './index.scss';
import { Button } from '@chakra-ui/react';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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

    const _onClick = () =>{
        if(showConfirm){
            confirmAlert({
                message: confirmText,
                buttons: [
                  {
                    label: 'Evet',
                    onClick: onClick()
                  },
                  {
                    label: 'Hayır',
                    onClick: () => {}
                  }
                ]
            });
        }
        else{
            onClick();
        }
    }

    return (
        <div className={`${className}`}>
            <Button type={type} leftIcon={leftIcon} rightIcon={rightIcon} variant={variant} size={size} className='w-100' onClick={_onClick} disabled={disabled} as={as} to={to}>
                {text}
            </Button>
        </div>
    );
};

export default Index;