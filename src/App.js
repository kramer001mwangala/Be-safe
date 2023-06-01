import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Volunteer from './Components/Volunteer';
import Incidents from './Components/Incidents';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Incidents />}></Route>
          <Route path='/volunteer' element={<Volunteer />}></Route>


        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;