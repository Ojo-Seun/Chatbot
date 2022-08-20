import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Store from '../components/Store'
import Tap1 from '../formTap/Tap1'
import Tap2 from '../formTap/Tap2'
import { baseURL, courseProperties, formDataValidation } from '../utils'

function UpdateCourse() {
  const navigate = useNavigate()
  const { state } = useContext(Store)
  const [tap, setTap] = useState(0)
  const [course, setCourse] = useState()
  const params = useParams()
  const { _id } = params
  const [input, setInput] = useState(courseProperties)
  const [formError, setFormError] = useState('')
  const [save, setSave] = useState(false)
  const {Token} = state.adminInfo



  

  const prevBtn = () => {

    setTap(0)
    setSave(false)
  }

  const nextBtn = () => {

    if (!input.title || !input.abbr || !input.faculty || !input.partTimeDuration || !input.fullTimeDuration || !input.description || !input.requirement || !input.url || !input.tuition || !input.applicationPeriod) {
      setFormError("Please Fill All The Fields With Valid Data")
      return
    }
    setTap(1)
    setSave(true)
  }
  const sendToServer = () => {
    for (let course in input) {
        if (!input[course] || formDataValidation(input[course], setFormError)) {

          setFormError("You Must Fill All The Fields With Valid Data ALL")
          return
      }
      
    }




    const data = {
      title: input.title,
    abbr: input.abbr,
    faculty:input.faculty,
    description:input.description,
    duration: {
        fullTime: input.fullTimeDuration,
        partTime:input.partTimeDuration
    },
    requirement:input.requirement,
    tuition:input.tuition,
    url:input.url,
    applicationPeriod: input.applicationPeriod,
    startDate: input.startDate,
    studyMode: input.studyMode,
    apply: input.apply,
    contact: {
            email: input.email,
            phoneNumber: input.phoneNumber,
            programDirector:input.programDirector
        }
  
    }



     axios.put(`${baseURL}/api/courses/updateCourse/${_id}`,
        data,
      {

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Token}`
          }
      }
      
      
    )
       .then(res => {
         setFormError(res.data.message)
         navigate('/dashboard/courses')
      }).catch(err => {
        setFormError(err.message)
    })

  }

  useEffect(() => {
     axios.get(`${baseURL}/api/courses/getCourse/${_id}`,
    {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}`
        }
      })
      .then(res => {
        setCourse(res.data.course)
        
      }).catch(err => {
        console.log(err)
    })

},[Token, _id])

  
  
  
  
  return (
    <div className='add-course-page'>
      <div className='add-course-form-wrapper'>
        <h4>UPDATE COURSE</h4>
        <pre style={{ color: "red" }} className='error'>{formError}</pre>
        <div className='tap-wrapper'>
          {tap === 0 ? <Tap1 setFormError={setFormError} input={input} setInput={setInput} /> : <Tap2 setFormError={setFormError} input={input} setInput={setInput} />}
        </div>
        <div className='btn-wrapper'>
        {tap === 1 && <button type='button' id='prev' onClick={()=>prevBtn()}>PREV</button>}
        {tap === 0 && <button type='button' id='next' onClick={() => nextBtn()}>NEXT</button>}
        {save && <button type='button' id='save' onClick={() => sendToServer()}>SAVE</button>}
      </div>
      </div>
      
    </div>
  )
}

export default UpdateCourse