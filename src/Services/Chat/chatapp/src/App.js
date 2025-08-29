import {Col, Row, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './Components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './Components/ChatRoom';

function App() {
  const[conn,setConnection]=useState();
  const[messages,setMessages]=useState([]);
  const joinChatRoom=async(username, chatroom)=>{
    try {
      const conn = new HubConnectionBuilder()
      .withUrl("http://localhost:5028/chat")
      .configureLogging(LogLevel.Information)
      .build();
      conn.on("JoinSpecificChatRoom",(username,msg)=>{
        console.log("msg: ",msg);
      });
      conn.on("ReceiveSpecificMessage",(username,msg)=>{
        setMessages(messages=>[...messages,{username,msg}]);
      });
      await conn.start();
      await conn.invoke("JoinSpecificChatRoom",{username,chatroom});
      setConnection(conn);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col ms='12'>
            <h1 className='font-weight-light'>Welcome to the V1 ChatApp</h1>
            </Col>
          </Row>
          {!conn
            ?<WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            :<ChatRoom messages={messages}></ChatRoom>
          }
          
        </Container>
      </main>
      
    </div>
  );
}

export default App;
