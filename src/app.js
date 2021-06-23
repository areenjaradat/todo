  
import React from 'react';
import SiteContext from './context/site';
import ToDo from './components/todo/todo';

import AuthProvider from './context/auth';
import Auth from './components/auth/auth'
import NavBar from './components/todo/header';
import { Container } from 'react-bootstrap';

export default class App extends React.Component {
  render() {
    return (
      <>
      <AuthProvider>
        <NavBar />
          <Auth capability="read">
          <SiteContext>
        <ToDo />
      </SiteContext>
          </Auth>
          <Auth capability="guest">
            <Container style={{ textAlign: 'center', marginTop: '100px' }}>
              <h1>To Do List Manager</h1>
              <p>You need to Signup then Signin to see the to do list</p>
            </Container>
          </Auth>
      
      </AuthProvider>
    </>
    );
  }
}
