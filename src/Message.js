import React, { useEffect } from 'react'
import './Message.css'
import { Avatar } from '@material-ui/core'
import 'firebase/compat/firestore'

function Message({ timestamp, user, message }) {

  return (
    <div className="message">
        <Avatar src={user.photo} />
        <div className="message_info">
            <h5>
                {user.displayName}
                <span className='message_timestamp'>
                  {new Date(timestamp?.toDate()).toUTCString()}
                </span>
            </h5>

            <p>{message}</p>
        </div>
    </div>
  )
}

export default Message