import React from 'react'
import { Link } from 'react-router-dom'

function ChatbotImage() {
  return (
    <div className='chatbotImage'><Link to='/'><img src='/chatbot.jpg' alt='chabot'/></Link></div>
  )
}

export default ChatbotImage