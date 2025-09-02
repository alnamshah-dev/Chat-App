import React from 'react';
import { Card, Button } from 'react-bootstrap';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

const ChatRoom = ({ messages, sendMessage, currentUser, chatroom, leaveChat }) => {
    return (
        <div className="chatroom-container">
            <Card className="shadow-lg chat-card">
                <Card.Header className="chat-header">
                    <div>
                        <h5 className="mb-0">Chat Room: <strong>{chatroom}</strong></h5>
                        <span className="text-success">● Online as {currentUser}</span>
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={leaveChat}>Leave</Button>
                </Card.Header>
                <Card.Body className="d-flex flex-column p-0">
                    <MessageContainer messages={messages} currentUser={currentUser} />
                    <SendMessageForm sendMessage={sendMessage} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChatRoom;
