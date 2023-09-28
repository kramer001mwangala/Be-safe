import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

function Incidents() {
  const [data, setData] = useState([]);

  // Define a state to keep track of the selected status for each incident
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/incidents')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // Function to handle changing the status for a specific incident
  const handleStatusChange = (id, status) => {
    setSelectedStatus({ ...selectedStatus, [id]: status });
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Reporter Name</th>
              <th>PhoneNumber</th>
              <th>Location</th>
              <th>Date Of Incident</th>
              <th>Incident Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.ID}</td>
                <td>{item.Name}</td>
                <td>{item.PhoneNumber}</td>
                <td>{item.Location}</td>
                <td>{item.incident_date}</td>
                <td>{item.incident_descr}</td>
                <td>
                  <div className="dropdown">
                    <select
                      className="form-select"
                      value={selectedStatus[item.ID] || 'Just Reported'}
                      onChange={(e) => handleStatusChange(item.ID, e.target.value)}
                    >
                      <option value="Just Reported">Just Reported</option>
                      <option value="Approved">Approved</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Incidents;
