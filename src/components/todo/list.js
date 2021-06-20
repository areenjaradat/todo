import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import  { useState, useEffect } from 'react';
import { If, Then } from 'react-if';
import Form from 'react-bootstrap/Form';

import { FormControl } from 'react-bootstrap';


function TodoList(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');

  const toggleField = (id) => {
    setOpen(!open);
    console.log(id);
    setId(id);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    props.updateItem(id, value);
    toggleField();
  };
    return (
      <>
        <ListGroup as="ul"  >
          {props.list.map(item => (
        
            <ListGroup.Item as="li" className={`complete-${item.complete.toString()}`} key={item._id}>
              <span type="onClick" onClick={() => props.handleComplete(item._id)}>
                {item.text}
              </span>
              <Button  onClick={() => props.deleteItem(item._id)}>Delete</Button>
              <Button onClick={() => toggleField(item._id)}>Update Item</Button>
            </ListGroup.Item>
              
          ))}
        </ListGroup >

<If condition={open === true}>
<Then>
<Form className="mt-3" >
  <FormControl placeholder="update a task text" onChange={(e) => setValue(e.target.value)}/>
  <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
</Form>
</Then>
</If>
</>
      );
}

export default TodoList;
