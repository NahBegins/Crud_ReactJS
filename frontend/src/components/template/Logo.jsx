import React from 'react';
import logo from '../../assets/img/logo.png'
import {Link} from 'react-router-dom'

import './Logo.css'

export default props => 
  <aside className="logo">
    <Link to="/" className="logo">
      <img src={logo} alt="logo"/>
    </Link>
  </aside>