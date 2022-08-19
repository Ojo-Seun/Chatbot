import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'

function CommentsPage() {
  const {state} = useContext(Store)
  const [data, setData] = useState({ comments: [], loading: true, error: false})
  


  const delComment = (e) => {
    const _id = e.target.id
    axios.delete(`/api/comments/deleteComment/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.adminInfo.Token}`
        }
      }
    )
      .then(res => {
        if (res.data.message === true) {
          const comments = data.comments.filter(x=>x._id !==_id)
          setData({ comments: comments, loading: false, error: false })
          return
          
        }
      
      }).catch(err => {
      console.log(err)
    })
    
}



  useEffect(() => {
    axios.get('https://bolaji-chatbot.herokuapp.com/api/comments/getComments')
      .then(res => {
      setData({comments:res.data.comments, loading:false, error:false})
      }).catch(err => {
      setData({comments:[], loading:false, error:true})
    })

},[])

  return (
      <Dashboard>
      <div className='comment-screen'>
        {data.loading && <LoadingIndicator />}
        {data.error && <div>Error In Connection</div>}
        {data.comments.length > 0 ? (
          <table className='comments-table'>
            <thead>
              <tr>
                <th></th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.comments.map((comment, index) => (
                  <tr key={index}>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{comment.comment}</td>
                    <td style={{textAlign:"center"}}><button onClick={(e)=>delComment(e)} type='button' id={comment._id}>DELETE</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ):(<div style={{textAlign:"center"}}>No Comments</div>)}
      </div>
    </Dashboard>
  )
}

export default CommentsPage