import React from 'react';
import '../App.css';
import logo from '../images/logo.png';


function Header(){

    return(
        <div className='header'>
            <img alt='centime-logo' src={logo} />
        </div>
    )
}

export default Header;