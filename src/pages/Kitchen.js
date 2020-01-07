import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';
import OrderCard from '../components/OrderCard'

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
    <div>
      {KitchenOrder.map((item)=>
        <OrderCard 
          key={item.id}
          table={item.table}
          client={item.client}
          total={item.total}
          order={item.order.map((item, index) => {
            return(
              <div key={index}>
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