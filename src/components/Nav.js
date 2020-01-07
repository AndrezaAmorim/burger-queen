import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";


const styles = StyleSheet.create({
	navbar: {
		
    display:"flex",
    marginLeft:"10%",
    height:"40%",
    marginTop:"2%"
    
  },
  
  styleLi: {
    listStyle: 'none',
    display:"inline",
    marginRight:"180%",
    fontSize:"25px",
    border:"solid"
    
    
  },

  styleLink:{
    textDecoration:"none",
    color:"black",
    
  }
	
})

export default function Navbar() {
	return (
		<nav className={css(styles.navbar)}>			
      <ul>
				<li className={css(styles.styleLi)}>
					<Link to="/" className={css(styles.styleLink)}>Salão</Link>
				</li>
				<li className={css(styles.styleLi)}>
					<Link to="/kitchen" className={css(styles.styleLink)}>Cozinha</Link>
				</li>
			</ul>
		</nav>
	);
}; 