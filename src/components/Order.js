import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  add: {
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

  removeItem: {
    width:"30px",
    height:"30px",

  },

  minusItem: {
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

  listItem:{
    display:"flex",
    justifyContent:"space-between",
    fontSize:"20px",
    marginTop:"25px"
  }
})

export default function Order (props) {

  return (
    <div key={props.item.id}>
      <div className={css(styles.listItem)}>
        <span>{props.item.Name}</span>
        {props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        <Button className={css(styles.minusItem)} 
          handleClick={(e) => 
            {props.minusItem(props.item)
            e.preventDefault()
          }} title={"-"}
        />
        
        {props.item.count}

        <Button className={css(styles.add)} 
          handleClick={(e) => {
            props.addItem(props.item) 
            e.preventDefault()
          }} title={"+"} 
        />

        <Button className={css(styles.removeItem)} 
          handleClick={(e) => {
            props.removeItem(props.item) 
            e.preventDefault()
          }} title={"🗑"} 
        />
      </div>
    </div>
  )
}