import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';
import OrderCard from '../components/OrderCard'
import {StyleSheet, css} from 'aphrodite'

const styles = StyleSheet.create({

  cardOrder:{
    backgroundColor:"white",
    
    
  },

  cardContainer:{
    border:"solid",
    backgroundColor:"red",
    width:"50%"
    
  },

  

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
    <div className={css(styles.cardContainer)} >
      
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
  )
}