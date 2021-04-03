import React, { FC } from 'react';
import './index.scss';
import { StarIcon } from '@chakra-ui/icons';

interface IDefaultProps{
    className: string,
    image: string,
    name: string,
    content: string,
    rate: number
}

const Index : FC<IDefaultProps>= (props : IDefaultProps) => {
    const { className, image, name, content, rate } = props;

    return (
        <div className={`${className} comment-container text-center`}>
                <img src={image} alt='student'/>
            <div className='text-container'>
                <p className='name mb-3'>{name}</p>
                <p className='text-muted content'>'{content}'</p>
                <div className='rate mt-3'>
                    <small>
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < rate ? 'yellow.400' : 'gray.300'}
                            />
                            ))}
                    </small>
                </div>
            </div>
        </div>
    );
};
export default Index;