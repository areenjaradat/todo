import axios from 'axios';

const routes = (action) => {
  const api = 'https://danengel-api-server.herokuapp.com/todo';

  const getItems = (callback) => {
    axios.get(api).then(response => {
      const array = response.data;
      callback(array);
    })
  }

  const addItems = (data, callback) => {
    // console.log(`inside addItem ${data.text}`, data.assignee, data.completed, data.difficulty);
    axios({
      method: 'post',
      url: api,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: data,
    }).then(response => {
      const newItem = response.data;
      callback(newItem);
    }).catch(err => console.log(err))
  }

  const deleteItems = (id, callback) => {
    axios({
      method: 'delete',
      url: `${api}/${id}`
    }).then(response => {
      callback();
    }).catch(err => console.log(err));
  }

  const updateItems = (id, data, callback) => {
    axios({
      method: 'put',
      url: `${api}/${id}`,
      data: data
    }).then(response => {
      const updatedItem = response.data;
      callback(updatedItem);
    }).catch(err => console.log(err));
  }

  return [
    getItems,
    addItems,
    deleteItems,
    updateItems
  ]
}
export default routes;


// import { useState, useEffect } from 'react';
// const axios = require('axios').default;

// // TODO: pass in method, body from todo-connected
// const useAjax = (apiUrl, method, body) => {

//   const [list, setList] = useState([]);

//   const _addItem = (item) => {
//     item.due = new Date();

//     axios({
//       method: 'post',
//       url: apiUrl,
//       headers: { 'Content-Type': 'application/json' },
//       data: JSON.stringify(item)
//     })
//       .then(response => response.data)
//       .then(savedItem => {
//         setList([...list, savedItem])
//       })
//       .catch(console.error);
//   };

//   const _toggleComplete = id => {

//     const item = list.filter(i => i._id === id)[0] || {};

//     if (item._id) {

//       item.complete = !item.complete;

//       let url = `${apiUrl}/${id}`;

//       axios({
//         url: url,
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         data: JSON.stringify(item)
//       })
//         .then(response => response.data)
//         .then(savedItem => {
//           setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
//         })
//         .catch(console.error);
//     }
//   };

//   const _deleteItem = id => {

//     let item = list.filter(i => i._id === id)[0] || {};

//     if (item._id) {

//       let url = `${apiUrl}/${id}`;

//       axios({
//         url: url,
//         method: 'delete',
//       })
//         .then(() => {
//           _getTodoItems();
//         })
//         .catch(console.error);
//     }
//   };

//   const _getTodoItems = () => {
//     axios({
//       url: apiUrl,
//       method: 'get',
//     })
//       .then(response => response.data)
//       .then(data => setList(data))
//       .catch(console.error);
//   };

//   useEffect(_getTodoItems, []);

//   // Update title of browser with complete / incomplete count
//   useEffect(() => {
//     let todoCount = list.filter(item => !item.complete).length;
//     document.title = `To Do List: ${todoCount}`;
//   })

//   return [
//     _addItem,
//     _toggleComplete,
//     _deleteItem,
//     list
//   ]
// }

// export default useAjax;