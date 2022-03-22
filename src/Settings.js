import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChannel from './SidebarChannel';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase'

function Settings() {
  
    return (
      <div className='settings'>
      </div>
      
    )
  }
  
  export default Settings