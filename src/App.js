import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './UI/Header';
import Home from './containers/Home/Home';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div data-reactroot=""
          className="feature-ess-control feature-edlp-with-banner feature-variant-modal feature-pdp-control">

          <div className="os-windows">
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/category/:catid" component={Categories} />
            <Footer/>
          </div>
        </div>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
