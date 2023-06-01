import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Incidents() {
const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/incidents')
        .then(res=> setData(res.data))
        //.then(data=>setData(data))
        //.then(err=>console.log(err))
        .catch(err=>console.log(err))
    },[]) 


const sendaward=async(id)=>{
//     try{
// await axios.delete(`http://localhost:8081/removestude/${id}`)
// window.location.reload()
//     }catch(err){
//         console.log(err)
//     }
}
    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
<div className='w-50 bg-white rounded p-3'>
    {/* <Link to="/create"className="btn btn-success"> Add +</Link> */}
   
    <table className='table'>
        <thead>
            <tr>
            <th>Reporter Name</th>
            <th>PhoneNumber</th>
            <th>Location</th>
            <th>Date Of Incident</th>
            <th>Incident Description</th>


            <th>ID</th>


            <th>Action</th>

            </tr>
        </thead>
        <tbody>
{
    data.map((data,i)=>(
         <tr key={i}>
            <td>{data.Name}</td>
            <td>{data.PhoneNumber}</td>
            <td>{data.Location}</td>
            <td>{data.incident_date}</td>
            <td>{data.incident_descr}</td>


            <td>{data.ID}</td>


            <td>
                
            <Link to={`update/${data.ID}`} className='btn btn-primary mb-10' >Delete</Link>
                <button className='btn btn-danger  ms-3' onClick={ e=>sendaward(data.ID)}>Award</button>

            </td>


         </tr>
    ))
}
        </tbody>
    </table>

</div>

    </div>
  )
}



export default Incidents