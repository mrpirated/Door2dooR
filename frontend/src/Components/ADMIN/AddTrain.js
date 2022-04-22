import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
const AddTrain = () => {
  const [trainName, setTrainName] = useState('');
  const [trainNum, setTrainNum] = useState('');
  const [days, setDays] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(trainName, trainNum, days);
  };
  return (
    <div>
      <h2 id='headerTitle'>Add Train</h2>
      <Form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Enter Train Name</label>
          <input
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Train Number</label>
          <input
            value={trainNum}
            onChange={(e) => setTrainNum(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Number of Days</label>
          <input
            value={days}
            type='number'
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div id='button' class='row'>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default AddTrain;
