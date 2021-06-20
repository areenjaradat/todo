import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import './todo.scss';

function ToDo () {

  useEffect(() => {
    document.title = `To Do List: ${list.filter(item => !item.complete).length}`;
  })

const [list,setList]=useState([]);

 const addItem = (item) => {
  console.log(item)
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };
  const deleteItem = (id) => {
    let newList = list.filter((i) => i._id !== id) || {};
    setList(newList);
  };
  const updateItem = (id, val) => {
    let item = list.filter(i => i._id === id)[0] || {};

    console.log(val);
    if (item._id) {
      item.text = val;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }
  }
  const toggleComplete = (id) => {

    let item = list.filter(i => i._id === id)[0] || {};
    console.log(item)
    if (item._id) {
      item.complete = !item.complete;
      let list1 = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(list1);
    }

  };

  useEffect(() => {
    let listInfo = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ];

    setList(listInfo);
  }, [])




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
              <TodoForm handleSubmit={addItem} />
            </div>
  
            <div>
              <TodoList
                list={list}
                handleComplete={toggleComplete}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            </div>
          </section>
      </>
    );
  }


export default ToDo;
