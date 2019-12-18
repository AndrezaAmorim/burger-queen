import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from '../components/button'

function ItensList (props) {
  return (
    <div key={props.item.id}>
      <div className={css(styles.listItem)}>
        <span>{props.item.Name}</span>
        <span>{props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>
        <Button className={css(styles.Add)} 
          handleClick={() => props.createOrder(props.item)}title={"+"} 
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  Add: {
    color: "red",
  },

  listItem:{
    display:"flex",
    justifyContent:"space-between",
    fontSize:"25px"
  }
})

export default ItensList;