import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
const AddStation = () => {
  const [name, setName] = useState('');
  const [stationCode, setStationCode] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, stationCode);
  };
  return (
    <div>
      <h2 id='headerTitle'>Add Station</h2>
      <Form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Enter Station Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='row'>
          <label>Enter Station Code</label>
          <input
            value={stationCode}
            onChange={(e) => setStationCode(e.target.value)}
          />
        </div>
        <div id='button' class='row'>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default AddStation;
