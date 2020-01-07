import React from 'react';

export default function OrderCard(props){

  console.log(props)
  return(
    <div>
      <div >
        Mesa: {props.table}
        Cliente: {props.client}
        Pedido: {props.order}
        Total: {props.total.toLocaleString("pt-BR", {style: "currency", currency:"BRL"})}
      </div>
    </div>

  )
}