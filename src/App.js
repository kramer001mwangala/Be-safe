import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Volunteer from './Components/Volunteer';
import Incidents from './Components/Incidents';
import Donors from './Components/Donors';
import Sidebar from './Components/Sidebar';

function App() {
  return (
        <BrowserRouter>

      <div className='container-fluid bg-secondary min-vh-100'>
        <div className='row'>
          <div className='col-2 bg-white vh-100'>
            <Sidebar/>
          </div>
          <div className='col'>
        <Routes>

          <Route path='/' element={<Incidents />}></Route>
          <Route path='/approved ' element={<Incidents />}></Route>

          <Route path='/volunteer' element={<Volunteer />}></Route>
          <Route path='/donors' element={<Donors />}></Route>
          
          
        </Routes>

        </div>
        </div>
        </div>

      </BrowserRouter>
    
  );
}

export default App;