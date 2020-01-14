import React, {useState} from 'react';
import {StyleSheet, css} from 'aphrodite'
import Button from './Button'

const styles = StyleSheet.create({
  btnItens: {
    color: "#1C1C1C",
    backgroundColor:"#FFFAF0",
    borderRadius:"15px",
    width:"150px",
    height:"75px",
    fontSize:"15px",
    marginTop:"15px",
   
    ':active': {
      position:"relative",
      top:"5px",
      boxShadow:"none",
    },

    ':hover': {
      backgroundColor: "rgb(221, 111, 38)",
      color: "#fff",
    },
  },

  btnAdd: {
    fontSize:"23px",
    fontWeight:"bold",
    backgroundColor:"#32CD32",
    borderRadius:"5px",
    border:"none",
    color: "white",
    width: "120px",
    height:"50px",
    marginTop:"20px"
  },

  modalBackground: {
    position: "absolute",
    backgroundColor: "#000000aa",
    width: "100%",
    top: 0,
    left: 0,
    height: "100%",
  },

  modal: {
    width: "200px",
    height:"180px",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign:"center",
    position: "relative",
    margin: "250px auto", 
    fontSize:"23px" 
  },

  inputModal:{
    width:"100%",
    height:"2em"
  }
})

export default function Menu(props) {
  const [show, setShow] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState("");  
  
  if (props.item.Type !== "Hambúrgueres") {
    return (
      <Button
        className={css(styles.btnItens)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        handleClick={(e) => {
          props.addItem(props.item);
          e.preventDefault();
        }}
      />
    );
  } 
  else {
    return (
      <div className={css(styles.cardContainer)}>
        <Button
          className={css(styles.btnItens)}
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          handleClick={(e) => {
            setShow(!show)
          }}
        />
        {show
          ? <div className={css(styles.modalBackground)} onClick={() => setShow(!show)} >
              <div className={css(styles.modal)} onClick={(e) => e.stopPropagation()}>
                {props.item.Extras.map((extra, index) => {
                  return (
                    <div key={index}>
                      <label>
                        {extra.Name} {extra.Price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </label>
                      <input className={css(styles.inputModal)}
                        type="radio" 
                        value={extra.Name} 
                        onChange={() => 
                        setSelectedExtra(extra.Name)} 
                        checked={extra.Name === selectedExtra}
                      />
                    </div>
                  )
                })}
                  <Button className={css(styles.btnAdd)}
                    handleClick={(e) => {
                      props.addItem(props.item, selectedExtra);
                      e.preventDefault();
                      setShow(!show);
                      setSelectedExtra("")
                    }}
                    title={"Adicionar"}
                  />
              </div>
            </div>
          : null        
        }
      </div>
    );
  }
}