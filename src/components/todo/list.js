import React, { useState, useEffect, useContext } from 'react';
import { SiteContext } from '../../context/site';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
// import './list.scss';
import usePagination from '../../hooks/paginationHook.js';
import { AuthContext } from '../../context/auth';


export default function TodoList(props) {
  const authContext = useContext(AuthContext);
  const context = useContext(SiteContext);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [handleSubmit] = useForm(todoList);
  const [filter, setFilter] = useState('all');
  const [goToNextPage, goToPreviousPage, changePage, getPaginatedData, getPaginationGroup] = usePagination();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleField = (id) => {
    setOpen(!open);
    setId(id);
  }

  // TODO: new state variable starting as All, tied to dropdown,
  // then run through if statements below to set filteredList
  let list = context.list;
  let filteredList = list;

  function todoList(todo) {
    setValue(todo);
    props.updateItem(id, value)
  }

  // sort by pending, completed or all
    if (filter === "complete") {
      filteredList = list.filter(item => item.completed === "complete");
    } else if (filter === "pending") {
      filteredList = list.filter(item => item.completed === "pending");
    } else if (filter === "in-progress") {
      filteredList =  list.filter(item => item.completed === "in-progress");
    } else if (filter === "all") {
      filteredList =  context.list;
    }


  function status(val) {
    if (val === 'pending') {
      return 'success';
    } else if (val === 'in-progress') {
      return 'warning';
    } else if (val === 'complete') {
      return 'danger';
    }
  }


  // sort by text, name and difficulty
  //console.log(filteredList);
  if (context.sortSelected === 'name') {
    filteredList.sort((a, b) => {
      if (a.assignee.toLowerCase() > b.assignee.toLowerCase()) return 1;
      if (a.assignee.toLowerCase() < b.assignee.toLowerCase()) return -1;
      return 0;
    })
    console.log(filteredList);

  } else if (context.sortSelected === 'difficulty') {
    filteredList.sort((a, b) => {
      if (a.difficulty > b.difficulty) return 1;
      if (a.difficulty < b.difficulty) return -1;
      return 0;
    })
  } else if (context.sortSelected === 'task') {
     filteredList = filteredList.sort((a, b) => {
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      return 0;
    })
    console.log(filteredList);
  }
  // console.log('inside sortSelected', context.sortSelected);

  return (
    <div>
      <h3>Sort Tasks</h3>
      <select onChange={(e) => context.setSortSelected(e.target.value)}>
        <option ></option>
        <option value="name">Name</option>
        <option value="difficulty">Difficulty</option>
        <option value="task">Task</option>
      </select>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="in-progress">In-progress</option>
        <option value="pending">Pending</option>
      </select>
      {getPaginatedData(filteredList).map((item) => (
        <div>
          <Modal.Dialog style={{ width: '40vw' }} key={item._id} className="m-2 shadow">
            <Modal.Header >
              <Button style={{ width: '85px', fontSize: '10px', borderRadius: '20px' }} action onClick={async () => {
                if (authContext.user.capabilities.includes('update')) {
                  await props.toggleComplete(item._id)
                } else {
                  alert("You don't have the permession to update!");
                }
              } } variant={status(item.completed)} className={`complete-${item.completed}`}>{item.completed}</Button>
              <Modal.Title className="ml-0">{item.assignee}</Modal.Title>
              <Button variant="none" onClick={async () => {
            if (authContext.user.capabilities.includes('delete')) {
              await props.deleteItem(item._id);
            } else {
              alert("You don't have the permession to delete!");
            }
          }}>X</Button>
            </Modal.Header>

            <Modal.Body>
              <p>{item.text}</p>
              <p className="">Difficulty: {item.difficulty}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={async () => {
                if (authContext.user.capabilities.includes('update')) {
                  await handleShow(); 
                  await toggleField(item._id);
                } else {
                  alert("You don't have the permession to update!");
                }
              }}>Update Item</Button>
            </Modal.Footer>
          </Modal.Dialog>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header >
              <Modal.Title>Update Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form className="mt-3 m-2" onSubmit={(e) => { handleSubmit(e); toggleField(id); }}>
                <FormControl placeholder="update a task" onChange={(e) => setValue(e.target.value)} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
          </Button>
              <Button variant="primary" onClick={(e) => { handleSubmit(e); toggleField(id); handleClose() }}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </div>


  );

}