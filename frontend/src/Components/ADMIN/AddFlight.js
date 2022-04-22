import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
const AddTrain = () => {
  const [flightName, setFlightName] = useState('');
  const [flightNum, setFlightNum] = useState('');
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [days, setDays] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(trainName, trainNum, days);
  };
  return (
    <div>
      <h2 id='headerTitle'>Add Train</h2>
      <Form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Enter Flight Name</label>
          <input
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Flight Code</label>
          <input
            value={flightNum}
            onChange={(e) => setFlightNum(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Start Airport</label>
          <input
            value={startAirport}
            onChange={(e) => setStartAirport(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Destination Airport</label>
          <input
            value={endAirport}
            onChange={(e) => setEndAirport(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Departure Time</label>
          <input
            type='time'
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>
        <div className='row'>
          <label>Enter Train Name</label>
          <input
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
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
