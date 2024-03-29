import React, { Fragment } from 'react'
import Chatbot from '../components/chatbot'
import Comment from '../components/Comment'

function HomePage() {
    return (
        <Fragment>
            <div className='home'>
                <div className='wrapper'>
                    <h1 className='intro-text'>Hello, Welcome To University Of Hull Chatbot known as (MasterBot)</h1>
                    <h4 className='manual'>This Chatbot can only handle Postgraduate Taught related questions. Click on button above to see
                        available Postgraduate Courses and their respective abbreviations, you can use course title or abbrivations to interact with the Chatbot.
                    </h4>
                    <div>
                    <Comment/>
                    </div>
                </div>
      </div>
      <Chatbot/>
      </Fragment>
    
  )
}

export default HomePage