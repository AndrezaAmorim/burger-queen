import React, { useState, useEffect } from 'react';
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
})

const option = {
  fadeAway: true,
  fadeAwayTimeout:2000,
};

export default function Kitchen () {

  const [pending, setPending] = useState ([])
  const [done, setDone] = useState([])

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
      
      setPending(docOrder.filter(doc => doc.status === "pending"))
      setDone(docOrder.filter((doc) => doc.status === "done"))
    })
  }, []) 
  
  function orderDone (item) {
    
    firebase
    .firestore()
    .collection("Orders")
    .doc(item.id)
    .update({
      status:"done",
      time: new Date().getTime()
    })
    const newPending = pending.filter((el) => el.id !== item.id);
    setPending(newPending);

    const newDone = [...done, {...item, status: "done", time: new Date().getTime()}];
    setDone(newDone)

    growl.success({ text: "Pronto para entrega", ...option})
  }

  function time(readyTime, orderTime){
    const diffTime = ((readyTime.getTime() - orderTime.getTime()) / 1000) / 60;
    if(diffTime <=60){
      return `Preparado em ${Math.abs(Math.round(diffTime))} min`;
    }else{
      const diffTime = (((readyTime.getTime() - orderTime.getTime()) / 1000) / 60) / 60;
      return `Preparado em ${Math.abs(Math.round(diffTime))} horas`;
    }
  }

  return(
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Pendentes</h1>
        <div className={css(styles.orderContainer)}>
          {pending.map((item)=>
          <div key={item.id} className={css(styles.cardInfo)}>
            <OrderCard 
              sendTime={new Date(item.sendTime).toLocaleTimeString("pt-BR")}
              table={item.table}
              client={item.client}
              total={item.total}
              orderDone={() => orderDone(item)}
              order={item.order.map((item, index) => {
                return(
                  <div key={index} className={css(styles.cardOrder)}>
                    {item.Name}
                    {item.count}
                  </div>
                )
              })}
            />
            <Button className={css(styles.btnSend)} 
              handleClick={(e) => { 
                orderDone(item)
                e.preventDefault() 
              }}title={"Pronto"} 
            />
          </div>
          )}
        </div>  
      </div>
      <div className={css(styles.cardContainer)} >
        <h1 className={css(styles.title)}>Pedidos Prontos</h1>
        <div className={css(styles.orderContainer)}>
          {done.map((item)=>
           <div key={item.id} className={css(styles.cardInfo)}>
              <OrderCard 
                sendTime={time(new Date(item.time), new Date(item.sendTime))}
                table={item.table}
                client={item.client}
                total={item.total}
                orderDone={() => orderDone(item)}
                order={item.order.map((item, index) => {
                  return(
                    <div key={index} className={css(styles.cardOrder)}>
                      {item.count} {item.Name}
                    </div>
                  )
                })}
              />
            </div>
          )}
        </div>    
      </div> 
    </div>
  )
}