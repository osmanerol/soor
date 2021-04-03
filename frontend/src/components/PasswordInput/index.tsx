import React, { FC, useState } from 'react';
import './index.scss';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

interface IDefaultProps{
    className?: string,
    text?: string,
    placeholder?: string,
    size?: string,
    variant?: string,
    leftIcon?: any,
    rightIcon?: any,
    control?: any,
    onChange?: any,
    disabled?: boolean
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, text, placeholder, size, variant='outline', control, onChange=()=>{}, disabled } = props;
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <div className={className}>
            { text && <small>{text}</small> }
            <InputGroup>
                <Input type={show ? 'text' : 'password'} placeholder={placeholder} size={size} variant={variant} control={control} onChange={onChange} disabled={disabled} />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Gizle' : 'Göster'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </div>
    );
};

export default Index;