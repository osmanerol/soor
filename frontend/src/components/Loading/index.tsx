import React from 'react';
import './index.scss';
import { useLoading, BallTriangle } from '@agney/react-loading';

const Index= () => {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <BallTriangle />,
    });

    return (
        <section {...containerProps} className='loading-container'>
            {indicatorEl}
        </section>
    );
};

export default Index;