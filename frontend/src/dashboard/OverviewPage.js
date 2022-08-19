import React, { useContext, useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import Store from '../components/Store'

function OverviewPage() {
  const { state } = useContext(Store)
  const {Token} = state.adminInfo
  const [overview, setOverview] = useState({})




  useEffect(() => {
    axios.get("http://localhost:5000/api/overview/getOverview", {
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
    })
      .then(res => {
        const accuracy = parseInt(res.data.Average_Accuracy)
        setOverview(res.data)
            const timer = ()=>{
                const bar = document.getElementById('bar')
              const persentage = document.getElementById('number')
              const constant = 100/565
              let per = accuracy.toFixed();
               bar.setAttribute('stroke-dashoffset',`${(565 -(accuracy/constant))}`)
               persentage.textContent = `${per}%`
               
              
            }

            timer()

      })
  },[Token])
  return (
    <Dashboard>
      <div className='overview-screen'>
        <div className='item1'>
        <div className="accuracy">
        <div className="outer">
            <div className="inner">
                <div id="number">0%</div>
                <div className='accuracy-text'>Average_Accuracy</div>
            </div>
        </div>
        <svg>
            <circle cx={100} cy={100} r={90} strokeDashoffset={565} stroke='purple' id="bar" strokeWidth='10'/>
        </svg>
    </div>
        </div>
        
        <div className='item2'>
          <div className='total-user'>
            <h4>Total Number Of Users</h4>
            <div className='total-user-number'>{overview.Total_User} </div>
          </div>
          <div className='average-user'>
            <h6>Average Users Per Month</h6>
            <span className='average-user-number'>{overview.Total_User_Per_Month}</span>
            <span className='average-user-text'>Understood {overview.Understood_Query} Queries Out Of {overview.Total_Query} Queries</span>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default OverviewPage