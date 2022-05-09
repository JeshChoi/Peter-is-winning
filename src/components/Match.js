import React from 'react'

export default function Match(props){
    return (
        <div className='match-container'>
            <div>
                <img className='match-image' src={props.imgSrc}></img>
            </div>
            <div className='match-text'>
                <div className='match-header'>
                    <p className='match-name'>{props.match}: </p>
                    <p className='match-compatibility'>Compatibility {props.percentage +"%"}</p>
                </div>
                    <p className='match-description'>Description:</p>
                    <p className='match-decription-text'>{props.description}</p>
            </div>
        </div>
    )
}