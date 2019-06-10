import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Gallery from './Gallery';
import VideoPlayer from './VideoPlayer';
import Login from './Login';

function App() {
  return (
    <main className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Gallery}/>
                <Route path="/player" component={VideoPlayer}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </BrowserRouter>
    </main>
  );
}

export default App;
