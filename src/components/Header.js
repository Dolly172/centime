import React from 'react';
import '../App.css';
import logo from '../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { switchChart } from '../store/index';


function Header(){

    const {chartSwitch} = useSelector(state => state.chart);
    console.log(chartSwitch);
    const dispatch = useDispatch();

    function handleSwitchClick(){
       dispatch(switchChart());
    }

    return(
        <div className='header'>
            <img alt='centime-logo' src={logo} />
            <button onClick={handleSwitchClick}>Switch Graph</button>
        </div>
    )
}

export default Header;