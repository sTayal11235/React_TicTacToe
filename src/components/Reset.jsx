import React from 'react'

const Reset = ({value, onClick}) => {
    return (
        <button className="reset" onClick={onClick}>{value}</button>
    )
}

export default Reset
