import React from 'react';
import '../css/App.css';
import Home from './Home';
import Register from './Register';
import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (
      <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}


export default App;