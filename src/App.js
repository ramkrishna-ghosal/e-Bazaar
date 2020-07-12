import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Layout from './UI/Layout';

class App extends Component {
  state = {
    isLoggedIn: false,
    loading: false,
    error: ''
  }


  componentDidMount() {
    console.log('Component Did Mount -- App.js')
    if (localStorage.getItem('Auth_token') !== null && localStorage.getItem('Auth_token') !== undefined) {
      this.changeLogin();
    }
  }


  render() {
    return (<div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Login changeLogin={this.changeLogin} />} />
          <Route path="/forgotpwd" render={() => <ForgotPassword/>}/>
          <Route path="*" render={() => <Layout isAuth={this.state.isLoggedIn} changeLogin={this.changeLogin} />} />
        </Switch>
      </Router>
    </div>)
  }

  changeLogin = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }));
  }

}

export default App;
