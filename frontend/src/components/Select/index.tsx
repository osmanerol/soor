import React, { FC } from 'react';
import './index.scss';
import { Select } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

interface IDefaultProps{
    className?: string,
    size?: string,
    text?: string,
    placeholder?: string,
    defaultValue?: string,
    onChange: any,
    datas: any,
    id: string,
    value: string,
    control: any,
    multiple?: boolean
}

const Index: FC<IDefaultProps> = (props: IDefaultProps) => {
    const { className, size='md', text, placeholder, defaultValue='', control, onChange, datas, id, value, multiple }= props;

    return (
        <div className={className}>
            <Controller control={control} name='select' defaultValue={defaultValue} 
                render={() => (
                    <>
                        { text && <small>{text}</small>}
                        <Select bg='white' textStyle='general' size={size} placeholder={placeholder} className='my-2' onChange={onChange} defaultValue={defaultValue} multiple={multiple}>
                            {
                                datas.map((item: any)=><option key={item[id]} value={item[id]}>{item[value]}</option>)
                            }
                        </Select>
                    </>
                )}
            />
        </div>
    );
};

export default Index;