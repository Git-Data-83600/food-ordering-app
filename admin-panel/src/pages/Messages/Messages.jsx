import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import './Messages.css'
import { config } from '../../services/config'

// create a socket connection with the server
const socket = io(`http://localhost:4005`)

function Messages() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // listen for the 'message' event from the server
    socket.on('message', (data) => {
      console.log('New message received:', data)
      setMessages([...messages, data])
    })

    // listen for initial messages from the server
    socket.on('initialMessages', (data) => {
      console.log('Initial messages received:', data)
      setMessages(data)
    })

    // cleanup function to disconnect the socket when the component unmounts
    return () => {
      //   socket.off('message')
      //   socket.off('initialMessages')
      //   socket.disconnect()
    }
  })

  const onSendMessage = () => {
    console.log('Sending message:', message)
    if (message.length == 0) {
      toast.error('Message cannot be empty')
    } else {
      // emit the 'sendMessage' event to the server with the message
      socket.emit('sendMessage', {
        sender: sessionStorage.getItem('name'),
        text: message,
        timestamp: new Date(),
      })

      setMessage('') // clear the input field after sending
    }
  }

  return (
    <div className='container'>
      <h2 className='page-header'>Messages</h2>
      <div className='messages-list'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              'message-item ' +
              (message.sender === sessionStorage.getItem('name')
                ? 'message-item-sender'
                : '')
            }
          >
            <div>
              <strong>{message.sender}</strong>: {message.text}
            </div>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className='mt-3'>
        <div className='input-group mb-3'>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type='text'
            className='form-control'
            placeholder='your message here'
            value={message}
          />
          <button
            onClick={onSendMessage}
            className='btn btn-outline-primary'
            type='button'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Messages
