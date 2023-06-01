import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Volunteer() {
const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/volunteers')
        .then(res=> setData(res.data))
        //.then(data=>setData(data))
        //.then(err=>console.log(err))
        .catch(err=>console.log(err))
    },[]) 


const sendmessage=async(id)=>{
    

}
    
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
<div className='w-50 bg-white rounded p-3'>
    {/* <Link to="/create"className="btn btn-success"> Add +</Link> */}
   
    <table className='table'>
        <thead>
            <tr>
            <th>FullNames</th>
            <th>AreaOfResidence</th>
            <th>ReasonOfvolunteer</th>
            <th>ID</th>


            <th>Action</th>

            </tr>
        </thead>
        <tbody>
{
    data.map((data,i)=>(
         <tr key={i}>
            <td>{data.FullNames}</td>
            <td>{data.AreaofResidence}</td>
            <td>{data.ReasonOfvolunteer}</td>
            <td>{data.ID}</td>


            <td>
                
            <Link to={`update/${data.ID}`} className='btn btn-primary '>Delete</Link>
                <button className='btn btn-danger ms-3' onClick={ e=>sendmessage(data.ID)}>SMS</button>

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


export default Volunteer