import React, { useEffect, useRef } from 'react';
import userAvatar from '../Images/user.jpg'; 

const MessageContainer = ({ messages, currentUser }) => {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((m, index) => {
                const isCurrentUser = m.username === currentUser;
                const bubbleClass = isCurrentUser ? 'current-user-bubble' : 'other-user-bubble';
                const wrapperClass = isCurrentUser ? 'message-right' : 'message-left';

                return (
                    <div key={index} className={`message-wrapper ${wrapperClass}`}>
                        <img src={userAvatar} alt={m.username} className="avatar" />
                        <div className="message-content">
                            <div className="message-header">
                                <span className="username">{isCurrentUser ? 'You' : m.username}</span>
                                <span className="timestamp">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className={`message-bubble ${bubbleClass}`}>
                                {m.msg}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div ref={endOfMessagesRef} />
        </div>
    );
};

export default MessageContainer;
