import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import '../chat.css'
import validate from '../utils'
import Axios from 'axios'
import { SyncOutlined } from '@ant-design/icons'
import MessageBox from './MessageBox'
import EmailBox from './EmailBox'
import Store from './Store'
import LoadingIndicator from './LoadingIndicator'

function Chatbot() {
    const {state} = useContext(Store)
    const [input, setInput] = useState('')
    const botWrapperRef = useRef(null)
    const inputRef = useRef(null)
    const [messageArray, setMessageArray] = useState([{bot:'', user: '' }])
    const [loading, setLoading] = useState(true)
    const spinRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [showMessageBox, setMessageBox] = useState({show:false, email:''})
    const [showEmailBox, setShowEmailBox] = useState(state.userEmail ? false : true)


const scroll = (elements) => {
        if(elements.length === 0)return
        for (let i = 0; i < elements.length; i++){
            elements[i].scrollIntoView(false)
        }
        const target = elements.length - 1
        elements[target].scrollIntoView(true)
    }



    const showChat = () => {
        botWrapperRef.current.classList.toggle('showChat')
        setOpen(!open)


    }
    
    


    const handleChange = (e) => {
        const value = e.target.value
        if (validate(value) || !state.userEmail || showEmailBox) {
            setMessageBox(false)
            return
        }
        setInput(e.target.value)

    }

    const eventQuery = (intent, setMessageArray) => {
        if (showEmailBox === true) {
            return
        }
        
        Axios.post(`https://bolaji-chatbot.herokuapp.com/dialogflowApi/eventQuery`,{event: intent })
            .then(res => {
                setMessageArray([{ bot: res.data.Response, user: '' }])
                setLoading(false)
                
            }).catch(err => {
                setLoading(false)
                setMessageArray([{bot:"Server Error Please Refresh The Page", user: ''}])
        })
    }
 

    const textQuery = (e) => {

        e.preventDefault()

        const lastUserMessageIsEmpty = messageArray[messageArray.length - 1].user

        if (validate(input)|| lastUserMessageIsEmpty === input) {
            return
        }


        setMessageArray((prev)=>[...prev,{user:input, bot:''}])
        setLoading(true)
        const elements = document.getElementsByClassName("user")
        scroll(elements)

        Axios.post(`https://bolaji-chatbot.herokuapp.com/dialogflowApi/textQuery`,
            {
             text:input
            })
            .then(res => {
                setLoading(false)

                const response = res.data

                if (response.Response === "Send message to department") {
                    setMessageArray([])
                    setMessageBox({ show: true, email: response.departmentEmail })
                } else {
                    setMessageArray([...messageArray, { user: input, bot: response.Response }])
                    const elements = document.getElementsByClassName("bot")
                    scroll(elements)
                }
                
                        // SEND QnAs To DATABASE
                
                const QnA = {
                    Question: input,
                    Answer: response.Response,
                    Understood: response.Understood,
                    Accuracy:response.Accuracy
                }

                Axios.post("/api/QnAs/addQnA", QnA)

                
            }).catch(err => {
                setLoading(false)
           })

        inputRef.current.value = ''

    }

    const handleSpin = () => {
        spinRef.current.classList.toggle("spin")
        setMessageBox({show:false, email:''})
        setLoading(false)
        eventQuery("Introduction", setMessageArray)

    }
    
    useEffect(() => {
        
        if (showEmailBox === true) {
            return
        }
        
        Axios.post(`https://bolaji-chatbot.herokuapp.com/dialogflowApi/eventQuery`,{event: "Introduction" })
            .then(res => {
                setMessageArray([{ bot: res.data.Response, user: '' }])
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                setMessageArray([{ bot: "Server Error Please Refresh The Page", user: '' }])
                
        })
},[showEmailBox])
    
    
    

  return (
      <div className='chatPage'>
          
          <div className='botContainer'>
              <button className='toggleBtn'  type='button'>
                  <span onClick={showChat} className='btn'>
                      <span className='img-container'><img src='/chatbot.jpg' alt='chatbot' /></span>
                    
                  <span >
                    {open? "Close" : "Chat Me"}
                  </span>
                  </span>
                    <SyncOutlined ref={spinRef} onClick={handleSpin} className='refresh'/>
              </button>
              <div className='botWrapper' ref={botWrapperRef}>
                  <div className='botMessage'>
                      {
                      messageArray.map((message, index) => {
                          return (
                              <Fragment key={index}>
                                  {
                                      <>
                                          {message.user && <div className='user'><span>{message.user}</span></div>}
                                          {message.bot && <div className='bot'><span>{message.bot}</span></div>} 
                                          
                                    </>
                                  }
                            </Fragment>

                          )
                      })
                      }
                      {loading && <div><LoadingIndicator/></div>}
                      {showMessageBox.show && <div id='messagebox-container'><MessageBox To={showMessageBox.email} setMessageArray={setMessageArray} show={setMessageBox} /></div>}
                      {showEmailBox && <div id='email-box-container'><EmailBox eventQuery={eventQuery} setMessageArray={setMessageArray} setShowEmailBox={setShowEmailBox} /></div>}
                  </div>

                  <form onSubmit={(e)=>textQuery(e)} className='inputContainer'>
                      <input type='text' ref={inputRef} onFocus={(e)=> e.target.value = ''} placeholder='Type Message Here' onChange={handleChange} />
                      <button type='submit'>Send</button>
                      
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Chatbot