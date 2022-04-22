import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import AddTrain from './AddTrain';
import AddStation from './AddStation';
import EditSchedule from './EditSchedule';
function AdminRoute() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='addtrain' element={<AddTrain />} />
        <Route path='addStation' element={<AddStation />} />
        <Route path='editSchedule' element={<EditSchedule />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
