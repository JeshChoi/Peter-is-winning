import React from 'react'
import winning from '../images/reeWinning.png'

export default function Header(){
    return (
        <div className="header"> 
            <img className="header-logo" src={winning} />
            <h1 className='header-text'>Are you winning?</h1>
        </div>
    )
}