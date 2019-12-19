import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

function Order (props) {
  return (
    <div key={props.item.id}>
      <div className={css(styles.listItem)}>
        <span>{props.item.Name}</span>
        {props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        <Button className={css(styles.remove)} 
          handleClick={() => props.createOrder(props.item)}title={"-"} 
        />
        
        <Button className={css(styles.add)} 
          handleClick={() => props.createOrder(props.item)}title={"+"} 
        />
      </div>
    </div>
  )
}

export default Order;

const styles = StyleSheet.create({
  add: {
    color: "red",
    width: "30px"
  },

  listItem:{
    display:"flex",
    justifyContent:"space-between",
    fontSize:"20px"
  }
})

