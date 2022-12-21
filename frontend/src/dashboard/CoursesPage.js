import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'
import { baseURL } from '../utils'

function CoursesPage() {
    const paginationLimit = 8

  const navigate = useNavigate()
  const { state } = useContext(Store)
  const {Token} = state.adminInfo
  const [data, setData] = useState({ courses: [], loading: true, error: false })
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
  










  const delCourse = (e) => {
    const _id = e.target.id
    axios.delete(`${baseURL}/api/courses/deleteCourse/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      }
    )
      .then(res => {
        if (res.data.message === true) {
          const courses = data.courses.filter(x=>x._id !==_id)
          setData({ courses: courses, loading: false, error: false })
          return
          
        }
      
      }).catch(err => {
      console.log(err)
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



    axios.get(`${baseURL}/api/courses/getCourses`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {

        
        setData({ courses: res.data.courses, loading: false, error: false })
        activeTap()
        const PageCount = Math.ceil(res.data.courses.length / paginationLimit)
        setPageCount(PageCount)
        
        
      }).catch(err => {
      setData({courses:[], loading:false, error:true})
    })

},[Token,currentTapNumber, paginationLimit])
  return (
      <Dashboard>
      <div className='course-screen'>
        <div>

        <div className='course-btn-container'><button onClick={()=> navigate('/dashboard/add-course')} type='button'>Add Course</button></div>
        {data.courses.length > 0 ? (
          <table className='courses-table'>
            <thead>
              <tr>
                <th></th>
                <th>Courses</th>
                <th>Abbreviations</th>
                <th style={{backgroundColor:"red"}}>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.courses.map((course, index) => 
                  <Fragment key={index}>
                    {
                      index >= minRange && index < maxRange && (
                    <tr>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{course.title}</td>
                    <td>{course.abbr}</td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => delCourse(e)} type='button' id={course._id}>DELETE</button></td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => navigate(`/dashboard/update-course/${course._id}`)} type='button' id={course._id}>UPDATE</button></td>
                  </tr>
                    )}
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
    
        <button className="pagination-button" disabled= {currentTapNumber === pageCount} onClick={()=> nextButton(currentTapNumber + 1)} id="next-button" aria-label="Next page" title="Next page">
            &raquo;
        </button>
    </nav>
      </div>
    </Dashboard>
  )
}

export default CoursesPage