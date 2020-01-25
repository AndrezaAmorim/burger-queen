import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnAdd: {
    fontSize:"25px",
    fontWeight:"bold",
    backgroundColor:"#32CD32",
    borderRadius:"20px",
    border:"none",
    color: "white",
    width: "40px",
    height:"40px",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },
  },

  btnRemoveItem: {
    width:"40px",
    height:"40px",
    backgroundColor:"#F8F8FF",
    borderRadius:"20px",
    border:"none",
    fontSize:"25px",
  },

  btnMinusItem: {
    backgroundColor:"#FF3030",
    color: "white",
    borderRadius:"20px",
    width: "40px",
    height:"40px",
    border:"none",
    fontWeight:"bold",
    fontSize:"25px",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },
  },

  listOrder:{
    fontSize:"20px",
    backgroundColor:"#F8F8FF",
    marginTop:"5%",
    textAlign:"center"
  },

  listOption:{
    display:"flex",
    justifyContent:"space-evenly",
    marginTop:"5%"
  },
})

export default function Order (props) {

  const extraPrice = props.item.extra ? 1 : 0
  const itemPrice = props.item.Price + extraPrice

  return (
    <div>
      <div className={css(styles.listOrder)}>
      <span>{props.item.Name}</span> <span>{props.item.extra}</span> = {itemPrice.toLocaleString("pt-BR", { style:"currency", currency: "BRL"})}
      <div className={css(styles.listOption)}>
        <Button className={css(styles.btnMinusItem)} 
          handleClick={(e) => 
            {props.minusItem(props.item, props.item.extra)
            e.preventDefault()
          }} title={"-"}
        />
        {props.item.count}
        <Button className={css(styles.btnAdd)} 
          handleClick={(e) => {
            props.addItem(props.item, props.item.extra) 
            e.preventDefault()
          }} title={"+"} 
        />
        <Button className={css(styles.btnRemoveItem)} 
          handleClick={(e) => {
            props.removeItem(props.item) 
            e.preventDefault()
          }} title={"🗑"} 
        />
      </div>
      </div>
    </div>
  )
}