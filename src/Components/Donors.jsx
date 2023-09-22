import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Donors() {
const [data,setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/shessafedonations')
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
            <th>Phonenumber</th>
            <th>Amount</th>
            
                        </tr>
        </thead>
        <tbody>
{
    data.map((data,i)=>(
         <tr key={i}>
            <td>{data.ID}</td>
           <td>{data.Phonenumber}</td>
            <td>{data.Amount}</td>
                      
         </tr>
    ))
}
        </tbody>
    </table>

</div>

    </div>
  )
}



export default Donors