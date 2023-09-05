import React from 'react'

const Square = ( props ) => {
  return (
    <div 
    onClick={props.onClick}
    style={{ 
        border: "1px solid", 
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}
    className='square'>
        <h2>{props.value}</h2>
    </div>
  )
}

export default Square