import React, {useState } from 'react'
import validate, { baseURL } from '../utils'
import Axios from 'axios'

function Comment() {
  const [comment, setComment] = useState(({ comment: "", isSent: false }))
  
  const handleChange = (e)=> {
    if (validate(e.target.value)) {
        return
    }
    setComment({comment:e.target.value, isSent:false})
  }

  const handleSendToServer = () => {
    if (validate(comment.comment) || comment.comment === "") {
      return
    }

    setComment({ ...comment, isSent: true })

    Axios.post(`${baseURL}/api/comments/addComment`, {comment:comment.comment})
      .then(res => {
        const input = document.getElementById("input")
        input.value = ''
      })

  }
  return (
      <div className='comment'>
          <textarea id='input' onFocus={(e)=> e.target.value = ''} onChange={handleChange} placeholder='Please send us feedback for improvement...'></textarea>
      <button type='button' onClick={handleSendToServer} className='send-comment'>{comment.isSent? "SENT" : "SEND"}</button>

    </div>
  )
}

export default Comment