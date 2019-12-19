import React from 'react';

const Button = (props) => {
  return (
    <button onClick=
      {props.handleClick} 
      className={props.className}>
        {props.item}
      {props.title} {props.Name} {props.Price} 
    </button>
  )

}

export default Button;