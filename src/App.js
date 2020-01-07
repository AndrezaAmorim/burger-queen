import React from 'react';
import Floor from './pages/Floor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Kitchen from './pages/Kitchen';
import Navbar from './components/Nav';


export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Floor} />
        <Route path="/kitchen" component={Kitchen} />
      </Switch>
    </Router>
  );
}
