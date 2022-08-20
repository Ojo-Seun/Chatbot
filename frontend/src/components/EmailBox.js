import React, { useContext, useRef, useState } from 'react'
import Store from './Store'
import axios from 'axios'
import validate, { baseURL } from '../utils'



const validateMessageInput = (ev) => {
const error = document.getElementById("email-error")
    let isValid = validate(ev.current.value)
    if (isValid) {
        ev.current.style.borderBottom ='5px solid red'
        error.textContent = "The input is not valid"
    } else {
        ev.current.style.borderBottom ='5px solid purple'
        error.textContent = ''
    }
    return isValid
}




function EmailBox({ setShowEmailBox, eventQuery, setMessageArray }) {
    const {dispatch} = useContext(Store)
    const [email, setEmail] = useState('')
    const inputRef = useRef(null)


    const handleChange = (e) => {
        setEmail(e.target.value)
    
}

    const handleClicked = () => {
        if (validateMessageInput(inputRef) || inputRef.current.value === '') {
            const error = document.getElementById("email-error")
            error.textContent = "You must enter a valid email"
            return
        }

        axios.post(`${baseURL}/api/user/addUserEmail`, { userEmail: email })
            .then(res => {
                dispatch({ type: "SETUSEREMAIL", payload: email })
                eventQuery("Introduction", setMessageArray)
            setShowEmailBox(false)
            }).catch(err => {
                return
        })
        
    }

    
  return (
      <form id="email-box">
          <div className='input-wrapper'>
              <label htmlFor='email'>Please Enter Your Email</label>
              <input ref={inputRef} onKeyUp={()=>validateMessageInput(inputRef)} type="email" id='email' required onChange={handleChange}/>
          </div>
          <pre style={{ color: "red", textAlign: "center" }} id='email-error'></pre>
          <div className='email-box-btn-wrapper'><button onClick={handleClicked} type='button'>Submit</button></div>
    </form >
  )
}

export default EmailBox