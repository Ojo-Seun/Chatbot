import React, { Fragment, useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'
import { baseURL } from '../utils'

function CommentsPage() {
  const paginationLimit = 8
  const { state } = useContext(Store)
  const [data, setData] = useState({ comments: [], loading: true, error: false })
  const [pageCount, setPageCount] = useState(0)
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(paginationLimit)
  const [currentTapNumber, setCurrentTapNumber] = useState(1)
  const Token = state.adminInfo.Token
   
  





  const prevButton = (value) => {
    
    setCurrentTap(value)
    
  }

  const nextButton = (value) => {
    
    setCurrentTap(value)
    
  }
  
  

  const setCurrentTap = (tapNumber) => {

    setCurrentTapNumber(tapNumber)

    

    
    setMinRange((tapNumber - 1) * paginationLimit)
    setMaxRange(tapNumber * paginationLimit)
  }
  


  const delComment = (e) => {
    const _id = e.target.id
    axios.delete(`${baseURL}/api/comments/deleteComment/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
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
    })
    
}


           


  useEffect(() => {

const activeTap = () => {
    const tapNumbers = document.getElementsByClassName("pagination-number")
  for (let i = 0; i < tapNumbers.length; i++){
      tapNumbers[i].classList.remove("active")
      if (parseInt(tapNumbers[i].id) === currentTapNumber) {
        tapNumbers[i].classList.add("active")
      }
    }
  }



    axios.get(`${baseURL}/api/comments/getComments`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {

        

        activeTap()
        const PageCount = Math.ceil(res.data.comments.length / paginationLimit)
        setPageCount(PageCount)
        setData({ comments: res.data.comments, loading: false, error: false })

        

      }).catch(err => {
      setData({comments:[], loading:false, error:true})
    })

},[paginationLimit, currentTapNumber, Token])

  return (
      <Dashboard>
      <div className='comment-screen'>
        <div>

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
                  data.comments.map((comment, index) => 
                    <Fragment key={index}>
                      {
                        index >= minRange && index < maxRange && (
                    <tr>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{comment.comment}</td>
                    <td style={{textAlign:"center"}}><button onClick={(e)=>delComment(e)} type='button' id={comment._id}>DELETE</button></td>
                  </tr>
                          
                        )
                      }
                    </Fragment>
                  
                    
                  
                  
                )
              }
            </tbody>
          </table>
        ):(<div style={{textAlign:"center"}}>No Comments</div>)}
        </div>
        <nav className="pagination-container">
        <button className="pagination-button" id="prev-button" disabled={currentTapNumber === 1} onClick={(e)=>prevButton(currentTapNumber - 1,e)}  aria-label="Previous page" title="Previous page">
            &laquo;
        </button>
    
          <div id="pagination-numbers">
            {
              [...Array(pageCount).keys()].map(x => <button type='button' key={x} className='pagination-number' onClick={(e)=>setCurrentTap(parseInt(e.target.id))} id={x + 1}>{x+1}</button>
              )
            }
        </div>
    
        <button className="pagination-button" disabled = {currentTapNumber === pageCount} onClick={()=> nextButton(currentTapNumber + 1)} id="next-button" aria-label="Next page" title="Next page">
            &raquo;
        </button>
    </nav>
      </div>
    </Dashboard>
  )
}

export default CommentsPage