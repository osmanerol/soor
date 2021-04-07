import React, { FC } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface IDefaultProps{
    image: string,
    name: string,
    job: string,
    slug: string
    rate: number,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, name, job, slug, rate } = props;
    const history = useHistory();

    return (
        <div className='teacher-card' onClick={()=>history.push(slug)}>
            <div className='image-container'>
                <img src={image} alt='teacher'/>
                <div className='rate text-center'>
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
            <div className='text-container'>
                <Link to={slug} className='text'>{name}</Link> 
                <p className='text-muted sub-text'>{job}</p>   
            </div>
        </div>
    );
};

export default Index;
/*
import React, { FC } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface IDefaultProps{
    image: string,
    name: string,
    job: string,
    slug: string
    rate: number,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, name, job, slug, rate } = props;
    const history = useHistory();

    return (
        <div className='teacher-card-container'>
            <div className='teacher-card' onClick={()=>history.push(slug)}>
                <div className='image-container'>
                    <img src={image} alt='teacher'/>
                    <div className='rate text-center'>
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
                <div className='text-container'>
                    <div className='text'>
                        <Link to={slug}>{name}</Link> 
                        <small className='text-muted'>{job}</small>   
                    </div>
                            <div className='price'>
                                <span>{price} ₺</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        
        export default Index;
*/