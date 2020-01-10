import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link } from "react-router-dom";


const styles = StyleSheet.create({
	navbar: {
		
    display:"flex",
    marginLeft:"0",
    height:"40%",
    width:"100%",
    marginTop:"2%",
    justifyContent:"flex-end"
    
    
  },
  
  styleLi: {
    listStyle: 'none',
    display:"inline",
    marginRight:"50px",
    fontSize:"25px",
   
  },

  styleUl:{
    marginRight:"20px",
  },

  styleLink:{
    fontWeight:"bold",
    textDecoration:"none",
    color:"grey"

  }
	
})

export default function Navbar() {
	return (
		<nav className={css(styles.navbar)}>			
      <ul className={css(styles.styleUl)}>
				<li className={css(styles.styleLi)}>
					<Link to="/" className={css(styles.styleLink)}>Salão</Link>
				</li>
				<li className={css(styles.styleLi)}>
					<Link to="/kitchen" className={css(styles.styleLink)}>Cozinha</Link>
				</li>
        <li className={css(styles.styleLi)}>
					<Link to="/server" className={css(styles.styleLink)}>Pedidos</Link>
				</li>
			</ul>
		</nav>
	);
}; 