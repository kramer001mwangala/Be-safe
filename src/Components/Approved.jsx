import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Approved() {
const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/incidents')
        .then(res=> setData(res.data))
        //.then(data=>setData(data))
        //.then(err=>console.log(err))
        .catch(err=>console.log(err))
    },[]) 
    
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
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

    </div>
  )
}



export default Approved