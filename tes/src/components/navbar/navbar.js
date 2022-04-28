import React from 'react';
import Logo from '../img/logo.png';
import './navbar.css'

export default function navbar() {
  return (
    <div>
       <div className='container-fluid'>
           <div className='row'>
               <div className='col-6'>
                 <img src={Logo}/>
               </div>
               <div className='col-6 text-end'><h3>Hallo,<span className='text-info'>Pabo Bernando</span></h3></div>
           </div>
       </div>
    </div>
  )
}
