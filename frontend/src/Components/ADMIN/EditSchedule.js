import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
const EditSchedule = () => {
  const [trainNums, setTrainNums] = useState([
    { num: '12345' },
    { num: '12346' },
  ]);
  const [stationCodes, setStationCodes] = useState([
    { code: 'NDLS' },
    { code: 'PRYG' },
  ]);
  const [num, setNum] = useState('');
  const [code, setCode] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [position, setPosition] = useState(0);
  const [day, setDay] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(num, code, arrivalTime, departureTime, day);
  };
  return (
    <div>
      <h2 id='headerTitle'>Add Schedule</h2>
      <Form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Enter Train Number</label>
          <select onChange={(e) => setNum(e.target.value)}>
            {trainNums.map((trains) => (
              <option value={trains.num}>{trains.num}</option>
            ))}
          </select>
        </div>
        <div className='row'>
          <label>Select Station</label>
          <select
            onChange={(e) => {
              setCode(e.target.value);
            }}
          >
            {stationCodes.map((station) => (
              <option value={station.code}>{station.code}</option>
            ))}
          </select>
        </div>
        <div className='row'>
          <label>Arrival Time</label>
          <input
            type='time'
            value={arrivalTime}
            onChange={(e) => {
              setArrivalTime(e.target.value);
            }}
          />
        </div>
        <div className='row'>
          <label>Departure Time</label>
          <input
            type='time'
            value={departureTime}
            onChange={(e) => {
              setDepartureTime(e.target.value);
            }}
          />
        </div>
        <div className='row'>
          <label>Position</label>
          <input
            type='number'
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
        </div>
        <div className='row'>
          <label>Day</label>
          <input
            type='number'
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
            }}
          />
        </div>
        <div id='button' class='row'>
          <button>Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default EditSchedule;
