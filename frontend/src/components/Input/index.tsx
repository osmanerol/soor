import React, { FC } from 'react';
import './index.scss';
import { InputGroup, InputLeftElement, Input, InputRightElement } from '@chakra-ui/react';

interface IDefaultProps{
    className?: string,
    id?: string,
    text?: string,
    placeholder?: string,
    size?: string,
    variant?: string,
    leftIcon?: any,
    rightIcon?: any,
    control?: any,
    onChange?: any,
    disabled?: boolean,
    background?: string,
    type?: string,
    defaultValue?: string,
    selectRef?: any,
    errors?: any,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, id, text, placeholder, size, variant='outline', leftIcon, rightIcon, control, onChange=()=>{}, disabled, background, type='text', defaultValue, selectRef, errors } = props;

    return (
        <div className={className}>
            { text && <small>{text}</small> }
            <InputGroup>
                { leftIcon && <InputLeftElement pointerEvents='none' children={leftIcon} /> }
                <Input id={id} name={id} type={type} placeholder={placeholder} bg={background} size={size} variant={variant} control={control} onChange={onChange} disabled={disabled} defaultValue={defaultValue} ref={selectRef} />
                { rightIcon && <InputRightElement children={rightIcon} /> }
            </InputGroup>
            {
                errors  && <small className='error'>{errors[id!]?.message}</small>
            }
        </div>
    );
};

export default Index;