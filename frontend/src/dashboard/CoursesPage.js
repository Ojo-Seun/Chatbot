import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import LoadingIndicator from '../components/LoadingIndicator'
import Store from '../components/Store'
import { baseURL } from '../utils'

function CoursesPage() {
  const navigate = useNavigate()
  const { state } = useContext(Store)
  const {Token} = state.adminInfo
  const [data, setData] = useState({ courses: [], loading: true, error: false})
  


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
    axios.get(`${baseURL}/api/courses/getCourses`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {
      setData({courses:res.data.courses, loading:false, error:false})
      }).catch(err => {
      setData({courses:[], loading:false, error:true})
    })

},[Token])
  return (
      <Dashboard>
          <div className='course-screen'>
        <div className='course-btn-container'><button onClick={()=> navigate('/dashboard/add-course')} type='button'>Add Course</button></div>
        {data.courses.length > 0 ? (
          <table className='courses-table'>
            <thead>
              <tr>
                <th style={{width:"5%"}}></th>
                <th style={{width:"50%"}}>Courses</th>
                <th style={{width:"20%"}}>Abbreviations</th>
                <th style={{width:"25%"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.courses.map((course, index) => (
                  <tr key={index}>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{course.title}</td>
                    <td>{course.abbr}</td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => delCourse(e)} type='button' id={course._id}>DELETE</button></td>
                    <td style={{ textAlign: "center" }}><button onClick={(e) => navigate(`/dashboard/update-course/${course._id}`)} type='button' id={course._id}>UPDATE</button></td>
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

export default CoursesPage