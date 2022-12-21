import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'
import { baseURL } from '../utils'





function QnA() {
  const paginationLimit = 6
  const { state } = useContext(Store)
  const {Token} = state.adminInfo
  const [data, setData] = useState({ QnAs: [], loading: true, error: false })
  const [pageCount, setPageCount] = useState(0)
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(paginationLimit)
  const  [currentTapNumber, setCurrentTapNumber] =useState(1)
   
  

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
  



  const delQnA = (e) => {
    const _id = e.target.id
    axios.delete(`${baseURL}/api/QnAs/deleteQnA/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      }
    )
      .then(res => {
        if (res.data.message === true) {
          const QnAs = data.QnAs.filter(x => x._id !== _id)
          
          setData({ QnAs: QnAs, loading: false, error: false })
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


    axios.get(`${baseURL}/api/QnAs/getQnAs`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {
        setData({ QnAs: res.data.QnAs, loading: false, error: false })
        
        activeTap()
        const PageCount = Math.ceil(res.data.QnAs.length / paginationLimit)
        setPageCount(PageCount)
      }).catch(err => {
      setData({QnAs:[], loading:false, error:true})
    })

},[Token,currentTapNumber, paginationLimit])
    return (
      <Dashboard>
        <div className='QnA-screen'>
          <div>

        {data.QnAs.length > 0 ? (
          <table className='QnAs-table'>
            <thead>
              <tr>
                <th></th>
                <th>Questions</th>
                <th>Answers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.QnAs.map((QnA, index) => 
                  <Fragment key={index}>
                    {
                       index >= minRange && index < maxRange && (
                    <tr key={index}>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{QnA.Question}</td>
                    <td>{QnA.Answer}</td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => delQnA(e)} type='button' id={QnA._id}>DELETE</button></td>
                  </tr>)
                    }
                  </Fragment>
                )
              }
            </tbody>
          </table>
        ) : (<div style={{ textAlign: "center" }}>No Courses</div>)}
        {data.loading && <LoadingIndicator />}
        {data.error && <div>Error In Connection</div>}
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
    
        <button className="pagination-button" disabled={currentTapNumber === pageCount} onClick={()=> nextButton(currentTapNumber + 1)} id="next-button" aria-label="Next page" title="Next page">
            &raquo;
        </button>
    </nav>
      </div>
      </Dashboard>
  )
}

export default QnA