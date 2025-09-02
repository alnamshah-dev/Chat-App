import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg.trim()) {
            sendMessage(msg);
            setMsg('');
        }
    };

    return (
        <div className="send-message-form-container">
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        className="message-input"
                        placeholder="Type your message here..."
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        autoComplete="off"
                    />
                    <Button variant="primary" type="submit" disabled={!msg.trim()}>
                        Send
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default SendMessageForm;
