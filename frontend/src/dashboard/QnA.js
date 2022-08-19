import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'





function QnA() {

  const { state } = useContext(Store)
  const {Token} = state.adminInfo
  const [data, setData] = useState({ QnAs: [], loading: true, error: false})
  


  const delQnA = (e) => {
    const _id = e.target.id
    axios.delete(`http://localhost:5000/api/QnAs/deleteQnA/${_id}`,
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
    axios.get('http://localhost:5000/api/QnAs/getQnAs',
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {
      setData({QnAs:res.data.QnAs, loading:false, error:false})
      }).catch(err => {
      setData({QnAs:[], loading:false, error:true})
    })

},[Token])
    return (
      <Dashboard>
          <div className='QnA-screen'>
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
                data.QnAs.map((QnA, index) => (
                  <tr key={index}>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{QnA.Question}</td>
                    <td>{QnA.Answer}</td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => delQnA(e)} type='button' id={QnA._id}>DELETE</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (<div style={{ textAlign: "center" }}>No Courses</div>)}
        {data.loading && <LoadingIndicator />}
        {data.error && <div>Error In Connection</div>}
      </div>
      </Dashboard>
  )
}

export default QnA