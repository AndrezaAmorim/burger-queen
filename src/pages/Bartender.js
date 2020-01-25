import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';
import OrderCard from '../components/OrderCard'
import {StyleSheet, css} from 'aphrodite'
import Button from '../components/Button'
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'

const styles = StyleSheet.create({

  cardOrder:{
    backgroundColor:"white",
  },
  
  btnSend: {
    color: "white",
    backgroundColor:"#32CD32",
    fontSize:"20px",
    fontWeight:"bold",
    borderRadius:"15px",
    width:"160px",
    height:"50px",
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

  bartenderPage:{
    display:"flex",
    width:"96%"
  },

  cardInfo:{
    border:" 1px solid black ",
    borderRadius:"5px",
    marginBottom:"20px",
    width:"70%",
    textAlign:"center",
    fontSize:"20px",
    padding:"20px"
  }, 

  styleTotal:{
    marginTop:"2%",
    fontWeight:"bold",
    color:"#363636"
  }
})

const option = {
  fadeAway: true,
  fadeAwayTimeout:2000,
};

export default function Bartender () {
   
  const [done, setDone] = useState([]); 
  const [delivered, setDelivered] = useState([])

  useEffect(() => {
    
    firebase
    .firestore()
    .collection("Orders")
    .orderBy("sendTime", "asc")
    .get().then((snapshot) => {
      const docOrder = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))      
      
      setDone(docOrder.filter(doc => doc.status === "done"))
      setDelivered(docOrder.filter(doc => doc.status === "delivered"))
    })
  }, []) 

  function orderDelivered(item){
    firebase
    .firestore()
    .collection("Orders")
    .doc(item.id)
    .update({
      status: "delivered",
      time: new Date().getTime()
    })

    const newDone = done.filter((el) => el.id !== item.id);
    setDone(newDone);

    const newDelivered = [...delivered, {...item, status: "delivered", time: new Date().getTime()}];
    setDelivered(newDelivered);

    growl.success({ text: "Pedido entregue", ...option})
  }

  function time(readyTime, orderTime){
    const diffTime = ((readyTime.getTime() - orderTime.getTime()) / 1000) / 60;
    if(diffTime <=60){
      return `Pedido entregue em ${Math.abs(Math.round(diffTime))} min`;
    }else{
      const diffTime = (((readyTime.getTime() - orderTime.getTime()) / 1000) / 60) / 60;
      return `Pedido entregue em ${Math.abs(Math.round(diffTime))} horas`;
    }
  }

  return(
    <div className={css(styles.bartenderPage)}>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Prontos</h1>
        <div className={css(styles.orderContainer)}>
          {done.map((item)=>
          <div key={item.id} className={css(styles.cardInfo)}>
            <OrderCard 
              table={item.table}
              client={item.client}
              order={item.order.map((item, index) => {
                return(
                  <div key={index} className={css(styles.cardOrder)}>
                    {item.count}
                    {item.Name} {item.extra}
                  </div>
                )
              })}
            />
            <Button className={css(styles.btnSend)} 
              handleClick={(e) => { 
                orderDelivered(item)
                e.preventDefault() 
              }}title={"Pedido Entregue"} 
            />
          </div>
          )}
        </div>  
      </div>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Entregues</h1>
        <div className={css(styles.orderContainer)}>
          {delivered.map((item)=>
           <div key={item.id} className={css(styles.cardInfo)}>
              <OrderCard 
                sendTime={time(new Date(item.time), new Date(item.sendTime))}
                table={item.table}
                client={item.client}
                total={item.total}
                orderDelivered={() => orderDelivered(item)}
                order={item.order.map((item, index) => {
                  return(
                    <div key={index} className={css(styles.cardOrder)}>
                      {item.count} {item.Name} {item.extra} 
                    </div>
                  )
                })}
              />
              <div className={css(styles.styleTotal)}>
                Total: {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
            </div>
          )}
        </div>    
      </div> 
    </div>
  )
} 

