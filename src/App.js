import React from 'react';
import './style/App.css';
import { Container } from 'react-bootstrap';

import { Switch, Route, Redirect } from 'react-router';
import Employee from './pages/employee';
import Login from './pages/login';
import { BrowserRouter } from 'react-router-dom';
import Email from './pages/email';
import Header from './components/header';
import Notfound from './pages/notfound';
import Signup from './pages/signup';
function App() {
  let loginId = sessionStorage.getItem('loginId');
  let isLoggedin = false;
  if (loginId !== null && loginId !== "") {
    isLoggedin = true;
  }
  return (
    <Container fluid >
      <Header></Header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <Login /></Route>
          <Route exact path="/signup"> <Signup /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/employee">{isLoggedin ? <Employee /> : <Login />}</Route>
          <Route path="/email">{isLoggedin ? <Email /> : <Login />}</Route>
          <Route ><Notfound /></Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App;
