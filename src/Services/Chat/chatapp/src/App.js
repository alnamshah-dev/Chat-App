import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import WaitingRoom from './Components/waitingroom';
import ChatRoom from './Components/ChatRoom';

function App() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [chatroom, setChatroom] = useState('');

    const joinChatRoom = async (username, room) => {
        try {
            const conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5028/chat" ) // تأكد من صحة العنوان
                .configureLogging(LogLevel.Information)
                .build();

            conn.on("JoinSpecificChatRoom", (username, msg) => {
                console.log("Welcome message from server: ", msg);
            });
            

            conn.on("ReceiveSpecificMessage", (username, msg) => {
                const newMessage = {
                    username,
                    msg,
                    timestamp: new Date() 
                };
                setMessages(prev => [...prev, newMessage]);
            });

            conn.onclose(() => leaveChat());

            await conn.start();
            await conn.invoke("JoinSpecificChatRoom", { username, chatroom: room });

            setConnection(conn);
            setUser(username);
            setChatroom(room);

        } catch (e) {
            console.error(e);
            alert("Connection failed. Please check the server and try again.");
        }
    };

    const leaveChat = () => {
        connection?.stop();
        setConnection(null);
        setMessages([]);
        setUser('');
        setChatroom('');
    };

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="app-container">
            {
                !connection
                    ? <WaitingRoom joinChatRoom={joinChatRoom} />
                    : <ChatRoom
                        messages={messages}
                        sendMessage={sendMessage}
                        currentUser={user}
                        chatroom={chatroom}
                        leaveChat={leaveChat}
                      />
            }
        </div>
    );
}

export default App;
