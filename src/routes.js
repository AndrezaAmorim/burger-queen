import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Nav';
import Floor from './pages/Floor';
import Kitchen from './pages/Kitchen';
import Bartender from './pages/Bartender'


export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Floor} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/bartender" component={Bartender} />
      </Switch>
    </Router>
  );
}
