import React, { FC } from 'react';
import './index.scss';
import { Button } from '@chakra-ui/react';

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
    type?: any
}

const Index : FC<IDefaultProps> = (props: IDefaultProps) => {
    const { className, text, size, variant, leftIcon, rightIcon, onClick=()=>{}, disabled=false, as, to, type='button' } = props;
    return (
        <div className={`${className}`}>
            <Button type={type} leftIcon={leftIcon} rightIcon={rightIcon} variant={variant} size={size} className='w-100' onClick={onClick} disabled={disabled} as={as} to={to}>
                {text}
            </Button>
        </div>
    );
};

export default Index;