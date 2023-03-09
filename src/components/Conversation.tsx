import React from 'react'
import { uid } from 'uid';
import { auth, db } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Message } from '../types';

type ConversationProps = {
    message: Message;
};

const Conversation = ({ message }: ConversationProps) => {
    const [user] = useAuthState(auth);

  return (
    <>
        <div className={`chat-bubble ${message.messageId === user.id ? "right" : "" }`}>
            <img className='chat-bubble_left'
            src= {message.avatar_url}
            alt="avatar"
            />
        </div>
        <div className="chat-bubble_right"> 
            <p className="user-name">{message.messageId}</p>
            <p className="message-text">{message.content}</p>
            <p className="message-time">{message.timestamp}</p>
        </div>
    </>
    );
};

export default Conversation;


