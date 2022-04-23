import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
const AddAirport = () => {
  const [name, setName] = useState('');
  const [airportCode, setAirportCode] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, stationCode);
  };
  return (
    <div>
      <h2 id='headerTitle'>Add Station</h2>
      <Form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Enter Airport Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='row'>
          <label>Enter Airport Code</label>
          <input
            value={airportCode}
            onChange={(e) => setAirportCode(e.target.value)}
          />
        </div>
        <div id='button' class='row'>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default AddAirport;
