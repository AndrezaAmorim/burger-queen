import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({

  styleName:{
    fontSize:"25px",
    color:"#363636",
    fontWeight:"bold",
    marginBottom:"2%"
  },

  styleTable:{
    marginBottom:"2%",
    fontWeight:"bold",
    color:"#363636"
  },

})

export default function OrderCard(props){

  return(
    
    <>
      <div className={css(styles.styleName)}>
        {props.client}
      </div>
      <div className={css(styles.styleTable)}>
        Mesa: {props.table}
      </div>
      
      {props.order}
      
    </>
  )
}