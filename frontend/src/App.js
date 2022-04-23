import LoadingProvider from './Components/COMMON/LoadingProvider';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/HOME/Home';
import ClientRoute from './Components/CLIENT/ClientRoute';
import AdminRoute from './Components/ADMIN/AdminRoute';
import CompanyRoute from './Components/COMPANY/CompanyRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className='App'>
      <LoadingProvider active={auth.isloading}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/client/*' element={<ClientRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
          <Route path='/company/*' element={<CompanyRoute />} />
        </Routes>
      </LoadingProvider>
    </div>
  );
}

export default App;
