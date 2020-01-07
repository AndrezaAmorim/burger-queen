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
    width:"40px",
    height:"40px",
    backgroundColor:"#F8F8FF",
    borderRadius:"20px",
    border:"none",
    fontSize:"25px",
    
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

  return (
    <div>
      <div className={css(styles.listOrder)}>
        <span>{props.item.Name} </span>
        <div className={css(styles.listOption)}>
          
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
    </div>
  )
}