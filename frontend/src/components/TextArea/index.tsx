import React, { FC } from 'react';
import './index.scss';
import { Textarea } from '@chakra-ui/react';

interface IDefaultProps{
    className?: string,
    id?: string,
    text?: string,
    placeholder?: string,
    size?: string,
    variant?: string,
    control?: any,
    onChange?: any,
    disabled?: boolean,
    background?: string,
    defaultValue?: string,
    selectRef?: any,
    errors?: any,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, id, text, placeholder, size, variant='outline', control, onChange=()=>{}, disabled, background, defaultValue, selectRef, errors } = props;

    return (
        <div className={className}>
            { text && <small>{text}</small> }
            <Textarea id={id} name={id} placeholder={placeholder} bg={background} rows={5} size={size} variant={variant} control={control} onChange={onChange} disabled={disabled} defaultValue={defaultValue} ref={selectRef} />
            {
                errors  && <small className="error">{errors[id!]?.message}</small>
            }
        </div>
    );
};

export default Index;