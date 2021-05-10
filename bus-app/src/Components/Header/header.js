import React from 'react'
import MetroTransit from '../Media/metcolor.png'
import './header.css';

export default function header() {
    return (
        <div className="header">
            <h1 id="header-text">Welcome to Next Transit</h1>
            <img id="header-image" src={MetroTransit} alt='Metro Transit' />
        </div>
    )
}
