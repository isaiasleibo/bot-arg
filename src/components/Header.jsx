import React from 'react'

const Header = ({text, back}) => {
    return (
        <div id="header">
            <img src={require('../img/atras.jpeg')} alt="" onClick={back} />
            <p>{text}</p>
        </div>
    )
}

export default Header