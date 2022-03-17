import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase'

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

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

  const handleAddChannel = () => {
      const channelName = prompt("Enter a new channel name");

      if (channelName) {
          db.collection("channels").add({
              channelName: channelName,
          });
      }
  };

  return (
    <div className="sidebar">
        <div className="sidebar_top">
            <h3>MILK</h3>
            <MoreHorizIcon fontSize='medium' />
        </div>

        <div className="sidebar_channels">
            <div className="sidebar_channelsHeader">
                <div className="sidebar_header">
                    <div><ExpandMoreIcon /></div>
                    <h4>Text Channels</h4>
                </div>

            <AddIcon onClick={handleAddChannel} className="sidebar_addChannel" />
            </div>

            <div className="sidebar_channelsList">
                {channels.map(({ id, channel }) => (
                    <SidebarChannel 
                        key={id} 
                        id={id} 
                        channelName={channel.channelName} 
                    />
                ))}
            </div>
        </div>

        <div className="sidebar_profile">
            <div className='avatar'><Avatar onClick={() => auth.signOut()} src={user.photo}/></div>
            <div className="sidebar_profileInfo">
                <h3>{user.displayName}</h3>
                <p>@{user.uid.substring(0,4)}</p>
            </div>

            <div className="sidebar_profileIcons">
                <MicIcon />
                <HeadsetIcon />
                <SettingsIcon />
            </div>
        </div>

    </div>
  )
}

export default Sidebar