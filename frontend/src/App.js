import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Gallery from './Gallery';
import VideoPlayer from './VideoPlayer';
import Login from './Login';

function App() {
  return (
    <main className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/home" component={Gallery}/>
            </Switch>
        </BrowserRouter>
    </main>
  );
}

export default App;
