import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';

export default function Kitchen () {

  const [order, setOrder] = useState([])

  useEffect(() => {
    
    firebase
    .firestore()
    .collection("Orders")
    .get().then((snapshot) => {
      const docOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))      
      // setOrder(docOrders.map((item)=>) );
      
    })
  }, []) 

  return(
    <h1>teste</h1>
  )
}