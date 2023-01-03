import React from 'react';
import s from './ButtonRegister.module.scss';


const Button = ({ children, isLoading = false, ...rest }) => {
    return (
        <button className={s.button} {...rest}>
            {children}
            {/* &nbsp; */}
            {/* {isLoading && <LoaderSmall />} */}
        </button>
    );
};

export default Button;