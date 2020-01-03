import React from 'react';

export default function Button (props) {
  return (
    <button onClick=
      {props.handleClick} 
      id={props.id}
      className={props.className}>
      {props.item}
      {props.title} 
      {props.Name} {props.Price} 
    </button>
  )
}