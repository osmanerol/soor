import React, { FC } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

interface IDefaultProps{
    className: string,
    image: string,
    name: string,
    job: string,
    to: string
    rate: number
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, image, name, job, to, rate} = props;
    const history = useHistory();

    return (
        <div className={`${className} teacher-card-container`}>
            <div className="teacher-card" onClick={()=>history.push(to)}>
                <div className="image-container">
                    <img src={image} alt="teacher"/>
                    <div className="rate text-center">
                        <small>
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={i < rate ? "yellow.400" : "gray.300"}
                                />
                                ))}
                        </small>
                    </div>
                </div>
                <div className="text">
                    <Link to={to}>{name}</Link> 
                    <small className='text-muted'>{job}</small>   
                </div>
            </div>
        </div>
    );
};

export default Index;