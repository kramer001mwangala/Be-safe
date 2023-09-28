import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function Approved() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/incidents')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  
  const pieData = [
    { name: 'Nairobi-CBD', value: 60 },
    { name: 'Luthuli street', value: 100 },
    { name: 'Mathare', value: 300},
    { name: 'Kariobangi', value: 500 }
  ];

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3'>
         {/* <Link to="/create"className="btn btn-success"> Add +</Link> */}
   
    <table className='table'>
        <thead>
            <tr>
            <th>ID</th>
            <th>Reporter Name</th>
            <th>PhoneNumber</th>
            <th>Location</th>
            <th>Date Of Incident</th>
            <th>Incident Description</th>
                        </tr>
        </thead>
        <tbody>
{
    data.map((data,i)=>(
         <tr key={i}>
            <td>{data.ID}</td>
            <td>{data.Name}</td>
            <td>{data.PhoneNumber}</td>
            <td>{data.Location}</td>
            <td>{data.incident_date}</td>
            <td>{data.incident_descr}</td>          
         </tr>
    ))
}
        </tbody>
    </table>

      </div>
      <ResponsiveContainer width="50%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Approved;
