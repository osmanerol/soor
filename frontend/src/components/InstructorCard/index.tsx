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
        <div className='instructor-card' onClick={()=>history.push(slug)}>
            <div className='image-container'>
                <img src={image} alt='instructor'/>
                <div className='rate text-center'>
                    <small>
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i+1 <= rate ? 'yellow.400' : 'gray.300'}
                            />
                            ))}
                    </small>
                </div>
            </div>
            <div className='text-container'>
                <Link to={slug} className='text text-center'>{name}</Link> 
                <p className='small-text text-center'>{job}</p>   
            </div>
        </div>
    );
};

export default Index;