import React, { FC } from 'react';
import './index.scss';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

interface IDefaultProps{
    className?: string,
    text?: string,
    id?: string,
    options: any,
    defaultValue?: any,
    onChange: any,
    label: string,
    value: string,
    selectRef?: any,
    errors?: any,
    control?: any
}
const Index: FC<IDefaultProps> = (props: IDefaultProps) => {
    const { className, text, id, options, defaultValue, onChange, label, value, selectRef, errors, control } = props;

    return (
        <div className={className}>
            { text && <small>{text}</small>}
                <Controller
                render={()=>
                    <Select
                        className='sub-text'
                        isMulti
                        styles={{
                            control: (base: any) => ({
                                ...base,
                                '&:hover': { borderColor: '#E2E8F0' },
                                border: '1.5px solid #E2E8F0',
                                boxShadow: 'none', 
                            }),
                            menu:  (base: any) => ({
                                ...base,
                                fontSize: '.9em'
                            })
                        }}
                        closeMenuOnSelect={false}
                        options={options}
                        placeholder='' 
                        defaultValue={defaultValue}
                        getOptionLabel={(option: any) => option[label]}
                        getOptionValue={(option: any) => option[value]}
                        onChange={onChange}
                    />
                }
                defaultValue={defaultValue}
                id={id}
                name={id!}
                control={control}
                ref={selectRef}
            />
            {
                errors  && <small className='error'>{errors[id!]?.message}</small>
            }
        </div>
    );
};

export default Index;