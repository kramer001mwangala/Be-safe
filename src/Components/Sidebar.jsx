import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
//import { IoMdLock } from 'react-icons/io';
//import safeimg from '../src/Shesafe.png';
function Sidebar() {
  return (
    <div className='bg-white sidebar p-2'>
      <div>
      <img src={"./Shesafe.png"} alt="She's Safe" width={25} height={25} />
       <span className="brand-name fs-4">She's Safe </span>
      </div>

      <hr className="text-dark" />

      <div className="list-group list-group-flush">
       
        <Link to='/' className='list-group-item py-2'>
          <i className="bi bi-house fs-5 me-3"></i>
          <span className='fs-5'>Reported Incidents</span>
        </Link>

        <Link to='/approved' className='list-group-item py-2'>
          <i className="bi bi-house fs-5 me-3"></i>
          <span className='fs-5'>Verified Incidents</span>
        </Link>

        <Link to='/volunteer' className='list-group-item py-2'>
          <i className="bi bi-house fs-5 me-3"></i>
          <span className='fs-5'>Applied Volunteers</span>
        </Link>
        <Link to='/donors' className='list-group-item py-2'>
          <i className="bi bi-house fs-5 me-3"></i>
          <span className='fs-5'>Received Donations</span>
        </Link>

        
      </div>
    </div>
  );
}

export default Sidebar;