import React from 'react';

export default function Input(props) {
  return (
    <div className={props.className}>
      <input type={props.type} 
        className={props.className}
        value={props.value} 
        onChange={props.handleChange} 
        placeholder={props.holder} 
      />
    </div>
  )
}