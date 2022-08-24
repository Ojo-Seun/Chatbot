import React, { useContext, useEffect, useRef, useState } from 'react'
import Store from './Store'
import axios from 'axios'
import { baseURL } from '../utils'



const validateMessageInput = (ev) => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const error = document.getElementById("email-error")
    let isValid = emailPattern.test(ev.current.value)
    if (!isValid) {
        ev.current.style.border ='5px solid red'
        error.textContent = "The input is not valid"
    } else {
        ev.current.style.border ='5px solid purple'
        error.textContent = ''
    }
    return isValid
}




function EmailBox({ setShowEmailBox, eventQuery, setMessageArray,setLoading }) {
    const {dispatch} = useContext(Store)
    const [email, setEmail] = useState('')
    const inputRef = useRef(null)


    const handleChange = (e) => {
        setEmail(e.target.value)
    
}

    const handleClicked = () => {
        if (!validateMessageInput(inputRef) || inputRef.current.value === '') {
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

    useEffect(() => {
        setLoading(false)
    },[setLoading])


    
    return (
      <div className='email-box-container'>
            
      <form id="email-box">
          <div className='input-wrapper'>
              <label htmlFor='email'>Please enter your email to start a chat.</label>
              <input ref={inputRef} onKeyUp={()=>validateMessageInput(inputRef)} type="email" id='email' required onChange={handleChange}/>
          </div>
          <pre style={{ color: "red", textAlign: "center" }} id='email-error'></pre>
          <div className='email-box-btn-wrapper'><button onClick={handleClicked} type='button'>Submit</button></div>
            </form >
            <div className='privacy'>
                <h4 style={{textAlign:"center"}}>Privacy</h4>
                <p>The email addres you provide will be used to pass information related to University of Hull programmes.
                By starting a chat you give us permission to communicate with you via this email address. The email address you provide will be secured</p>
            </div>
      </div>
  )
}

export default EmailBox