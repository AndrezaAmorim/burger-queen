import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";


const styles = StyleSheet.create({
	navbar: {
		listStyle: 'none',
		display: 'inline',
		marginRight:"15px"
	},
	
})

export default function Navbar() {
	return (
		<nav>			
      <ul>
				<li className={css(styles.navbar)}>
					<Link to="/">Salão</Link>
				</li>
				<li className={css(styles.navbar)}>
					<Link to="/kitchen">Cozinha</Link>
				</li>
			</ul>
		</nav>
	);
}; 