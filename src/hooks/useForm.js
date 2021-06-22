import { useState } from 'react';

const useForm = (action) => {
  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    action(values);
  };

  const handleInputChange = e => {
    console.log([e.target.name], e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [
    handleSubmit,
    handleInputChange,
    values
  ]
}

export default useForm;