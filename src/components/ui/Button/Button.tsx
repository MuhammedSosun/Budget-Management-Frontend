import React, { Children } from 'react'
import './Button.scss'

interface ButtonProps {
    children: React.ReactNode;
    variant: 'primary' | 'succes' | 'danger' | 'link',
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset';


}

function Button({ children, variant, onClick, type = "button" }: ButtonProps) {
    const className = `my-custom-button ${variant}`;
    return (
        <button className={className} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

export default Button