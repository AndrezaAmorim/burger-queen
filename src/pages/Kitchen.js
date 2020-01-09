import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';
import OrderCard from '../components/OrderCard'
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({

  cardOrder:{
    backgroundColor:"white",
    
    
  },

  orderContainer:{
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
    overflow:"auto",
    width:"700px",
    height:"480px",

  },

  cardContainer:{
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
    borderRadius:"5px",
    border:"1px solid grey",
    width:"50%",
    height:"600px",
    marginLeft:"1%",
    marginRight:"1%",
    marginTop:"10px",
   
  },

  title: {
    textAlign:"center",
    fontSize: "35px",
    color: "grey"
  },

  kitchenPage:{
    display:"flex"
  }

  

})

export default function Kitchen () {

  const [KitchenOrder, setKitchenOrder] = useState([])

  useEffect(() => {
    
    firebase
    .firestore()
    .collection("Orders")
    .get().then((snapshot) => {
      const docOrder = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))      
      setKitchenOrder(docOrder)
      
    })
  }, []) 

  return(
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Pendentes</h1>
        <div className={css(styles.orderContainer)}>
          {KitchenOrder.map((item)=>
            <OrderCard 
              key={item.id}
              table={item.table}
              client={item.client}
              total={item.total}
              order={item.order.map((item, index) => {
                return(
                  <div key={index} className={css(styles.cardOrder)}>
                    {item.Name}
                    {item.count}
                    
                  </div>
                )
              })}
            />
          )}
        </div>  
      </div>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Prontos</h1>

      </div> 
    </div>
    
    
  )
}