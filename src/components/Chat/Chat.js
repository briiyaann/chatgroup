import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css'

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const room = 1;
    const ENDPOINT = 'https://tribuchat.herokuapp.com/';
    useEffect(() => {
        let { name, email } = JSON.parse(localStorage.getItem('userDetails'))

        if(name == undefined) {
            name = 'Test1';
        }

        if(email == undefined) {
            email = 'test@email.com';
        }

        socket = io(ENDPOINT);

        setName(name);
        setEmail(email);

        socket.emit('join', {name, room, email} ,() => {

        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);

            console.log(users)
          });
    }, [messages]);

    // function for creating messages
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} email={email} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            {/* <TextContainer users={users}/> */}
        </div>
    );
};

export default Chat;