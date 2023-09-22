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
    <div className='d-flex vh-100 justify-content-center align-items-center'>
<div className='w-75 bg-white rounded p-3'>
    {/* <Link to="/create"className="btn btn-success"> Add +</Link> */}
   
    <table className='table'>
        <thead>
            <tr>
            <th>ID</th>
            <th>FullNames</th>
            <th>AreaOfResidence</th>
            <th>VolunteerReason</th>
            
        
                    </tr>
        </thead>
        <tbody>
{
    data.map((data,i)=>(
         <tr key={i}>
             <td>{data.ID}</td>
            <td>{data.FullNames}</td>
            <td>{data.AreaofResidence}</td>
            <td>{data.ReasonOfvolunteer}</td>
           

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