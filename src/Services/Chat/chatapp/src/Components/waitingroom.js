import { useState } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');

    return (
        <div className="waiting-room-container">
            <Card className="p-4 shadow-lg waiting-room-card">
                <Card.Body>
                    <div className="text-center mb-4">
                        <h1 className="app-title">Welcome to the V1 ChatApp</h1>
                    </div>
                    <Form onSubmit={e => {
                        e.preventDefault();
                        joinChatRoom(username, chatroom);
                    }}>
                        <FloatingLabel controlId="floatingUsername" label="Your Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingChatroom" label="Room Name" className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Enter room name"
                                value={chatroom}
                                onChange={e => setChatroom(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg" disabled={!username || !chatroom}>
                                Join
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default WaitingRoom;
