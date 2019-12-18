import React, { useState, useEffect } from 'react'
import firebase from '../utils/firebase'
import Button from '../components/button'
import Input from '../components/input'
import {StyleSheet, css} from 'aphrodite'
import ItensList from '../components/itensList'


export default function ShowMenu(){
	const [category, setCategory] = useState ("Café da manhã");
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
  
  const categoryItems = category === "Lanches" ? itensLunch : itensBreakfast;

  function createOrder(item){
    setOrder([...order, item])
 
  }

  function sendOrder(){
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
      setClient('')
      setTable('')
      setOrder([])
      setTotal([])
    })
  }

	return (
    <div className={css(styles.App)}>  
      <div className={css(styles.styleMenu)}>
        <h1 className={css(styles.title)}>Menu</h1>
        <div className={css(styles.btn)}>
          <Button className={css(styles.btnBreakfast)} 
            handleClick={(e) => { 
              setCategory("Café da manhã"); 
              e.preventDefault() 
            }}title={"Café da Manhã"} 
          />
          <Button className={css(styles.btnLunch)} 
            handleClick={(e) => { 
              setCategory("Lanches"); 
              e.preventDefault() 
            }}title={"Almoço/Jantar"} 
          />
        </div>
        {categoryItems.map((item) => <ItensList item={item} createOrder={createOrder}/>)}
      </div>	
      <div className={css(styles.styleMenu)}>
        <Input class ='input' label='Nome: ' type='text' value={client} 
          handleChange={e => setClient(e.currentTarget.value)} holder='Nome do Cliente' 
        />
        <Input class ='input' label='Mesa: ' type='text' value={table} 
          handleChange={e => setTable(e.currentTarget.value)} holder='Mesa do Cliente'
        />
        {order.map((item) => <ItensList item={item} createOrder={createOrder}/>)}
        <p>{total}</p>
        <Button className={css(styles.btnLunch)} 
          handleClick={(e) => { 
            setOrder(sendOrder); 
            e.preventDefault() 
          }}title={"Enviar"} 
        />
      </div>
    </div>		  
	);
}

const styles = StyleSheet.create({
  App: {
    display:"flex",

  },
  styleMenu: {
    display: "flex",
    flexDirection: "column",
    width: "50%"
  },
  title: {
    textAlign:"center",
    fontSize: "40px",
    
  },
  btn: {
    fontSize:"20px",
    marginLeft: "10%",
    marginBottom: "5%"
  },
  btnBreakfast: {
    color: "red",
    width: "20%",
    marginRight: "5%"    
  },
  btnLunch: {
    color: "blue",
    width: "20%"    
  },
  
})
	
		
 



