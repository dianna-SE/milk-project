import React, { useState, useEffect } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { selectChannelId, selectChannelName } from './features/appSlice'
import db from './firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'




function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const [inputStr, setInputStr] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    }

    useEffect(() => {
        if (channelId) {
            db.collection('channels')
            .doc(channelId).collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [channelId]);
    
    const sendMessage = e => {
        e.preventDefault();

        db.collection("channels").doc(channelId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input + inputStr,
            user: user,
        });

        setInput("");
    };

  return (
    <div className="chat">
        
        <ChatHeader channelName={channelName} />
        
        <div className="chat_messages">
            {messages.map((message) => (
                <Message 
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                />
            ))}
        </div>
        <div className='emojiIcon'>
            {showPicker && <Picker
                        set='apple'
                        title='select your emooji' 
                        color='#ae65c5'
                        style={{ height: '100%', width: '110%'}}
                        emoji='cow'
                        emojiSize={24}
                        onEmojiClick={onEmojiClick}
                        onSelect={console.log(onEmojiClick)}
                        />}
        </div>
        <div className="chat_input">
                <div className="circleIcon">
                    <EmojiEmoticonsIcon 
                        fontSize="small" 
                        onClick={() => setShowPicker(val => !val)}
                    />
                </div>

                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)} 
                        disabled={!channelId}
                        placeholder={`message @${channelName}`}
                    />
                    <button
                        disabled={!channelId}
                        className="chat_inputButton" 
                        type='submit'
                        onClick={sendMessage}
                        cleanOnEnter
                    >
                        Send Message
                    </button>
                </form>

                

                <div className="chat_inputIcons">
                    <AddPhotoAlternateIcon fontSize="medium" />
                    <SportsEsportsIcon fontSize='medium' />
                </div>
                
                
                
        </div>
    </div>
  )
}

export default Chat