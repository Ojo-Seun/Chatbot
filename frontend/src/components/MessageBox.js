import React, { useContext, useRef, useState } from 'react'
import Store from './Store'
import Axios from 'axios'
import validate from '../utils'




const validateMessageInput = (e) => {
const error = document.getElementById("error")

    let isValid = validate(e.current.value)
    if (isValid) {
        error.textContent = "The input is not valid"
    } else {
        error.textContent = ''
    }
    return isValid
}

function MessageBox({show, setMessageArray,To}) {
    const [input, setInput] = useState({subject: '', text: '' })
    const subjectRef = useRef(null)
    const textRef = useRef(null)
    
    const {state} = useContext(Store)
    

    const handleChange = (e) => {
        
        const name = e.target.name;
        const value = e.target.value;
        setInput(values=> ({...values,[name]:value}))
    }

    const handleClick = () => {
        const subjectValue = subjectRef.current.value
        const textValue = textRef.current.value
        if (validate(subjectValue) || subjectRef === '' || validate(textValue) || textValue === '') {
        const error = document.getElementById("error")
            error.textContent = "You must fill all the fields with valid input"
            return
        }

        const message = {
            From: state.userEmail,
            To: To,
            Subject: input.subject,
            Text:input.text
        }

        Axios.post("http://localhost:5000/api/messages/sendMessage", message)
            .then(res => {
            show(false)
        setMessageArray([{bot:res.data.message, user:''}])
            }).then(err => {
            
        })

        textRef.current.value = ''
    }

  return (
      <form id='messageBox'>
          <pre id='error'></pre>
          
          <div>
              <label htmlFor='subject'>Subject</label>
              <input ref={subjectRef} value={input.subject} type="text" onBlur={(e)=>validateMessageInput(subjectRef)} onChange={handleChange} name='subject'/>
          </div>
          <div>
              <textarea ref={textRef} value={input.text} required name="text" onBlur={(e)=>validateMessageInput(textRef)} onChange={handleChange} placeholder='Type your questions here...' />
          </div>
          <div><button type='button' onClick={handleClick}>Submit</button></div>
        
    </form>
  )
}

export default MessageBox