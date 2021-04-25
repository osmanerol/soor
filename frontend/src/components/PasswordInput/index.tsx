import React, { FC, useState } from 'react';
import './index.scss';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { BiShowAlt, BiHide } from 'react-icons/bi';

interface IDefaultProps{
    id?: string,
    className?: string,
    text?: string,
    placeholder?: string,
    size?: string,
    variant?: string,
    leftIcon?: any,
    rightIcon?: any,
    control?: any,
    onChange?: any,
    selectRef?: any,
    disabled?: boolean,
    errors?: any,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { id, className, text, placeholder, size='md', variant='outline', control, onChange=()=>{}, selectRef, disabled, errors} = props;
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <div className={className}>
            { text && <small>{text}</small> }
            <InputGroup>
                <Input id={id} name={id} type={show ? 'text' : 'password'} placeholder={placeholder} size={size} variant={variant} control={control} onChange={onChange} disabled={disabled} ref={selectRef} />
                <InputRightElement children={ show ? <BiHide /> : <BiShowAlt /> }  onClick={handleClick} />
            </InputGroup>
            {
                errors  && <small className='error'>{errors[id!]?.message}</small>
            }
        </div>
    );
};

export default Index;