import { uid } from 'uid';
import { auth, db } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { Message } from '../types';
// import { User } from '@firebase/auth';
// import { useState } from 'react';





const Message = ({ message }: any) => {
    const [user]: | any = useAuthState(auth);

  return (
        <div className={`chat-bubble ${message.uid === user.id as String ? "right" : "" }`}>
            <img className='chat-bubble_left'
            src= {message.avatar}
            alt="avatar"
        />
            <div className="chat-bubble_right"> 
                {/* <p className="user-name">{message.messageId}</p> */}
                <p className="message-text">{message.name}</p>
                <p className="message-time">{message.text}</p>
            </div>
        </div>
    );
};

export default Message;


