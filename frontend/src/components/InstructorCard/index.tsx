import React, { FC } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface IDefaultProps{
    image: string,
    first_name: string,
    last_name: string,
    job: string,
    slug: string
    rate: number,
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { image, first_name, last_name, job, slug, rate } = props;
    const history = useHistory();

    return (
        <div className='instructor-card' onClick={()=>history.push(`/instructor/${slug}`)}>
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
                <Link to={slug} className='text text-center'>{first_name} {last_name}</Link> 
                <p className='small-text text-center'>{job}</p>   
            </div>
        </div>
    );
};

export default Index;