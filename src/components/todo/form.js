 import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

// import { SiteContext } from '../context/site.js';

import useForm from '../../hooks/useForm';


function TodoForm(props) {
  // const context = useContext(SiteContext);
  const [handleSubmit,handleInputChange] = useForm(props.addItem);

  return (
    <>
     <Card style={{ width: '24rem', height: '25rem' ,padding: '10px' }}>
      <h3>Add Item</h3>
      <Form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <Form.Label>
          <span>To Do Item</span>
          <Form.Control
            name="text"
            placeholder="Add To Do List Item"
            onChange={handleInputChange}
          />
        </Form.Label>
        <Form.Label>
          <span>Difficulty Rating</span>
          <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </Form.Label>
        <Form.Label>
          <span>Assigned To</span>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
        </Form.Label>
        <Button type="submit">Add Item</Button>
     
      </Form>
    </Card>
    </>
  );
}
export default TodoForm;
