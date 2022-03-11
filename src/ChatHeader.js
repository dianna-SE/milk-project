import React from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'
import jug from './images/jug.png'

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
        <div className="chatHeader_left">
            <h3>
                <span className="chatHeader_hash">
                    <img src={jug}></img>
                </span>
                {channelName}
            </h3>
        </div>


        <div className="chatHeader_right">
            <NotificationsIcon />

            <div className="chatHeader_search">
                <form>
                    <input placeholder="Search" />
                </form>
                <SearchRoundedIcon />
            </div>

            <HelpRoundedIcon />
        </div>
    </div>
  )
}

export default ChatHeader