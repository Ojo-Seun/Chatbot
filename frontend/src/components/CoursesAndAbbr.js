import React, { useState } from 'react'
import  Axios from 'axios'

function CoursesAndAbbr() {
  const [showTable, setShowTable] = useState(false)
  const [courses, setCourses] = useState([])

  const toggleTable = () => {
    setShowTable(!showTable)
  }


  useState(() => {
    Axios.get("http://localhost:5000/api/courses/getCourses")
      .then(res => {
      setCourses(res.data.courses)
    })
  })

  return (
      <div className='dropdown'>
      <div className='open-dropdown'><button onClick={toggleTable}>{showTable?"Close" : "Courses"}</button></div>
      {
        showTable &&(
      <table className='content'>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Courses</th>
            <th>Abbreviations</th>
          </tr>
        </thead>
        <tbody>
              {courses.length > 0 && (
                courses.map((course, index) =>
                <tr key={index}>
                    <td style={{textAlign:"center"}}>{index}</td>
                    <td>{course.title}</td>
                    <td>{course.abbr}</td>
          </tr>)
          )}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default CoursesAndAbbr



