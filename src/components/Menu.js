import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {

    color: "#1C1C1C",
    backgroundColor:"#FFFAF0",
    borderRadius:"15px",
    width:"160px",
    height:"60px",
    fontSize:"15px",
    marginTop:"15px",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },

    ':hover': {
      backgroundColor: "rgb(221, 111, 38)",
      color: "#fff",
      
    },
  },
})

export default function Menu (props) {
  
  return (
    <div>
      <Button  className={css(styles.btnItens)} 
        id={props.id}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        handleClick={() => props.addItem(props.item)}
      />
    </div>
  )
}