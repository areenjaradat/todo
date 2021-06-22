import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useForm from '../../hooks/useForm';
import './todo.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import useAjax from '../../kooks/useAjax';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {
  //const [list, _postItem, _deleteItem, _putItem, _getItems,,_toggleComplete] = useAjax(todoAPI);
  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };
  const updateItem = (id, val) => {
    // let item = list.filter(i => i._id === id)[0] || {};

    // console.log(val);
    // if (item._id) {
    //   item.text = val;
    //   let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
    //  console.log('newlist',newList)
    //   setList(newList);
    // }


    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.text = val;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  }

  const deleteItem = id => {
    // let item = list.filter(i => i._id === id)[0] || {};

    // if (item._id) {
    //   let newList = list.filter(listItem => listItem._id !== id);
    //   setList(newList);

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(savedItem => {
          _getTodoItems();
        })
        .catch(console.error);
    }
    
  }
  useEffect(_getTodoItems, []);

  return (
    <>
      <Navbar bg="primary">
        <Nav.Link style={{ color:'white' }} href="#home"><h4>Home</h4></Nav.Link>
        </Navbar>
          <header>
            <h2 style={{backgroundColor:"black",color:"white",marginLeft:"80px",marginRight:"100px",width:"1200px",padding:"10px",marginTop:"20px"}}>
            To Do List Manager ({list.filter(item => !item.complete).length}) 
            </h2>
          </header>

      <section className="todo">

        <div>
          <TodoForm addItem={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
