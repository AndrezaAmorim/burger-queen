import React from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({

  cardInfo:{
    
    border:" 1px solid black ",
    borderRadius:"5px",
    marginBottom:"20px",
    flexWrap:"wrap",
    width:"70%",
    textAlign:"center",
    fontSize:"20px"
    
  },

  btnSend: {
    color: "white",
    backgroundColor:"#32CD32",
    fontSize:"20px",
    fontWeight:"bold",
    borderRadius:"15px",
    width:"150px",
    height:"40px",
    marginTop:"10px",
    marginLeft:"10px",
    marginBottom:"10px",
    
    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },

    ':hover': {
      backgroundColor: "#7FFF00",
      color: "#fff",
      cursor: "pointer",
    },
  } 


  

})

export default function OrderCard(props){

  return(
    
      <div className={css(styles.cardInfo)}>
        Mesa: {props.table}
        Cliente: {props.client}
        {props.order}

        <Button className={css(styles.btnSend)} 
         handleClick={(e) => { 
           e.preventDefault() 
         }}title={"Enviar"} 
        />
        
      </div>
    

  )
}