import React from 'react'

const Square = ({value, onClick}) => {
    return (
        <button className={`square ${value === "X" ? 'isx':'iso'}`} onClick = {onClick}>{value}</button>
    )
}

export default Square
