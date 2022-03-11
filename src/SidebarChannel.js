import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from './/features/appSlice'
import './SidebarChannel.css'
import jug from './images/jug.png'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase'
import ClearIcon from '@material-ui/icons/Clear';

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);


const handleDeleteChannel = () => {
    const channels = window.confirm(`Are you sure you want to delete this channel?`);

    if (channelName) {
        db.collection("channels").doc(channels).delete({
            channelName: channelName,
        });
    }
};

useEffect(() => {
  db.collection("channels").onSnapshot((snapshot) => 
      setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            channel: doc.data(),
      }))
  )
);
}, []); 

  return (
    <div className="sidebarChannel" onClick={() => 
      dispatch(
        setChannelInfo({
          channelId: id, 
          channelName: channelName,
        })
      )}
    >
        <h4>
            <span className="sidebarChannel_hash">
              <img src={jug}></img>
              
            </span>{channelName}      

          <div className='clearIcon'>
            <ClearIcon 
              className='clearIcon'
              onClick={() => handleDeleteChannel(channels.id)}
              id={channels.id}
            />
            </div>

        </h4>
    </div>
  )
}

export default SidebarChannel