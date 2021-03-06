import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Index = (props : any) => {
    const { component : Component, rest } = props;
    
    return (
        <Route { ...rest } render={ props => (
            localStorage.getItem('token') ?
            <Component { ...props } />:
            <Redirect to='/' />
        )} />
    );
};

export default Index;