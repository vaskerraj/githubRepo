import React from 'react';
import { BrowserRouter, useHistory, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import RepoDetail from './components/RepoDetail';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fuild">
            <Route exact={false} path="/" component={ Main } />
            <Route path="/details/:full_name/:name" component={ RepoDetail } />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
