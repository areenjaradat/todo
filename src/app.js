  
import React from 'react';
import SiteContext from './context/site';
import ToDo from './components/todo/todo';

export default class App extends React.Component {
  render() {
    return (
      <SiteContext>
        <ToDo />
      </SiteContext>
    );
  }
}