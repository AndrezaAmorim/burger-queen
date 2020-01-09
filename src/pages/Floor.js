import React, { useState, useEffect } from "react";
import firebase from '../utils/Firebase';
import { StyleSheet, css } from 'aphrodite'
import Button from '../components/Button'
import Menu from '../components/Menu'
import Input from '../components/Input'
import Order from '../components/Order'
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'

const styles = StyleSheet.create({
  App: {
    display:"flex",
  },

  styleMenu: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginTop:"2%"
    
  },

  title: {
    textAlign:"center",
    fontSize: "35px",
    color: "grey"
  },

  btnPosition: {
    display:"flex",
    justifyContent:"space-around"
  },

  btnMenu: {
    color: "#fff",
    backgroundColor:"#FF8247",
    borderRadius:"15px",
    width:"30%",
    height:"75px",
    fontSize:"20px",
    fontWeight:"bold",

    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },

    ':hover': {
      backgroundColor: "rgb(221, 111, 38)",
      color: "#fff" 
    },
  },

  btnSend: {
    color: "white",
    backgroundColor:"#32CD32",
    fontSize:"20px",
    fontWeight:"bold",
    borderRadius:"15px",
    width:"150px",
    height:"70px",
    marginTop:"20px",
    marginLeft:"12px",
    
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

  inputPosition: {
   
    display:"flex",
    justifyContent:"space-evenly"
  },

  inputMenu:{
   borderRadius:"13px",
   width:"170px",
   height:"35px",
   textAlign:"center"
  },

  btnItensPosition:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-evenly",
    height:"20%",
    width:"100%",
  },

  listItens:{
    marginTop:"20px",
    marginBottom:"20px",
    overflow:"auto",
    width:"90%",
    height:"370px",
    marginLeft:"20px",
  },

  total:{
    fontWeight:"bold",
    fontSize:"18px",
    marginLeft:"14px",
    
  }
})

export default function ShowMenu(item){

  const [category, setCategory] = useState ('Café da manhã')
  const [client, setClient] = useState('')
  const [table, setTable] = useState('')
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState (0) 
  const [itensBreakfast, setItensBreakfast] = useState([]) 
  const [itensLunch, setItensLunch] = useState([]) 
  
  useEffect(() => {
      
    firebase
    .firestore()
    .collection("Menu")
    .get().then((snapshot) => {
      const docMenu = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))      
      setItensBreakfast(docMenu.filter(doc => doc.Category === "Café da manhã"));   
      setItensLunch(docMenu.filter(doc => doc.Category === "Lanches"));
    })
  }, []) 
  
  const categoryItems = category ==="Lanches" ? itensLunch : itensBreakfast

  function addItem(item, extra){ 
    const itemIndex = order.findIndex((el) => el.id === item.id && el.extra ===extra);
    if (itemIndex === -1) {
      setOrder([...order, { ...item, count: 1, extra }])
    } else {
      const newOrder = [...order];
      newOrder[itemIndex].count += 1;
      setOrder(newOrder);
     
    }
    const extraPrice = extra ? 1:0;
    setTotal(total + (item.Price + extraPrice ))
  }

  function minusItem(item, extra) {
    const itemIndex = order.findIndex((el) => el.id === item.id && el.extra ===extra);
    const itemCount = order[itemIndex];
    if (itemCount.count === 1) {
      removeItem(itemCount)
    } else {
      itemCount.count += -1;
      setOrder([...order]);
      
    }
    const extraPrice = extra ? 1:0;
    setTotal(total - (item.Price + extraPrice))
  }

  function removeItem(item) {
    const index = (order.indexOf(item));
    const extraPrice = item.extra ? 1 : 0
    order.splice(index, 1);
    setOrder([...order]);
    setTotal(total - ((item.Price  + extraPrice) * item.count))
  }

  function sendOrder(){
    
    if(client && table){
      firebase
      .firestore()
      .collection("Orders")
      .add({
        client,
        table,
        order,
        total
      })
      .then(() => {
        growl.success("Pedido enviado")
        setClient('')
        setTable('')
        setOrder([])
        setTotal(0)
      })
    }else {
      growl.warning("Preencha nome e mesa")
    }
  }

  return (
    <div className={css(styles.App)}>  
      <div className={css(styles.styleMenu)}>
        <h2 className={css(styles.title)}>Menu</h2>
        <div className={css(styles.btnPosition)}>
          <Button className={css(styles.btnMenu) } 
            handleClick={(e) => { 
              setCategory("Café da manhã"); 
              e.preventDefault() 
            }}title={"Café da Manhã"} 
          />
          <Button className={css(styles.btnMenu)} 
            handleClick={(e) => { 
              setCategory("Lanches"); 
              e.preventDefault() 
            }}title={"Almoço/Jantar"} 
          />
        </div>
        <div className={css(styles.btnItensPosition)}>
          {categoryItems.map((item) => <Menu key={item.id} item={item} addItem={addItem}/>)}
        </div>
      </div>
      
      <div className={css(styles.styleMenu)}>
        <h2 className={css(styles.title)}>Pedidos</h2>
        <div className={css(styles.inputPosition)}>
          <Input className={css(styles.inputMenu)} holder='Cliente' type='text' value={client} 
            handleChange={e => setClient(e.currentTarget.value)} 
          />
          <Input className ={css(styles.inputMenu)} holder='Mesa' type='text' value={table} 
            handleChange={e => setTable(e.currentTarget.value)}
          />
        </div>
        <div className={css(styles.listItens)}>
          {order.map((item) => <Order key={item.id} item={item} addItem={addItem} 
          minusItem={minusItem} removeItem={removeItem}/>)}
        </div>
          <div className={css(styles.total)}>
            Total {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
          <Button className={css(styles.btnSend)} 
         handleClick={(e) => { 
           sendOrder()
           e.preventDefault() 
         }}title={"Enviar"} 
       />
      </div>
    </div>
  ) 
}

