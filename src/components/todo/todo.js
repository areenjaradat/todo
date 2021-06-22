  
import React, { useEffect, useContext } from 'react';
import { When } from 'react-if';
import TodoForm from './form.js';
import TodoList from './list.js';
import Pagination from './pagination.js';
import Navbar from 'react-bootstrap/Navbar';
import { SiteContext } from '../../context/site';
import useAjax from '../../hooks/useAjax';
import './todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';

function ToDo() {
  const context = useContext(SiteContext);
  const [getItems,addItems,deleteItems,updateItems] = useAjax();

  const addItem = (item) => {
    if(!item.difficulty) {
      item.difficulty = 1;
    }
    item.completed = 'pending';
    console.log(item);
    addItems(item, newItem => context.setList([...context.list, newItem]));
  };

  const toggleComplete = id => {
    let item = context.list.filter(i => i._id === id)[0] || {};
    let status = item.completed;
    let temp = '';
    if (item._id) {
      if (status === "pending") temp = "in-progress";
      if (status === "in-progress") temp = "complete";
      if (status === "complete") temp = "pending";
      item.completed = temp;
      updateItems(id, item , (newItem) => context.setList(context.list.map(listItem => listItem._id === item._id ? newItem : listItem)));
    }
  };

  const updateItem = (id, val) => {
    let item = context.list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.text = val;
      updateItems(id, item , (newItem) => context.setList(context.list.map(listItem => listItem._id === item._id ? newItem : listItem)));
    }
  }

  const deleteItem = id => {
    let item = context.list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      deleteItems(id, () => context.setList(context.list.filter(listItem => listItem._id !== id)));
    }
  }

  useEffect(() => {
    getItems(context.setList);
  }, [])

  useEffect(() => {
    const itemsToDo = context.list.filter(item => item.completed === 'pending').length;
    document.title = `${itemsToDo} item(s) to complete`
  })

  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand className="brand" href="#home">HOME</Navbar.Brand>
        
      </Navbar>
      <header>
        <h6 className="counter-Header">
          To Do List Manager ({context.list.filter(item => item.completed === 'pending').length})
          </h6>
      </header>
      <section className="todo">
        <div>
          <TodoForm 
          addItem={addItem} 
          />
        </div>
        <div>
          <TodoList
            // list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
          <When condition={context.pages > 1}>
            <Pagination/>
          </When>
        </div>
      </section>
    </>
  );

}

export default ToDo;