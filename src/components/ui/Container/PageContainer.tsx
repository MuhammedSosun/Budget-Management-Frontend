import React from 'react';
import './pageContainer.scss';

interface ContainerProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large' | 'full';
}

const Container = ({ children, size = 'medium' }: ContainerProps) => {
    return (
        <div className={`container container--${size}`}>
            {children}
        </div>
    );
};

export default Container;