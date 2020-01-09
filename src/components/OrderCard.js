import React from 'react';
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({

  cardInfo:{
    border:"solid",
    marginTop:"5%",
    flexWrap:"wrap",
    width:"80%"
    
  },


  

})

export default function OrderCard(props){

  console.log(props)
  return(
    <div>
      <div className={css(styles.cardInfo)}>
        Mesa: {props.table}
        Cliente: {props.client}
        Pedido: {props.order}
        Total: {props.total.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})}
      </div>
    </div>

  )
}