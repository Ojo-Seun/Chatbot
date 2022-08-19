import React, { useEffect, useState } from 'react'
import { formDataValidation } from '../utils'

function Tap2({inputFromBackend = null, input, setInput, setFormError}) {


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        formDataValidation(value,setFormError)
        setInput(values=> ({...values, [name]:value}))
        
    }

    
  return (
      <form className='form-tap tap2'>
          <div>
              <label htmlFor='startDate'>Start Date</label>
              <input type="text" value = {input.startDate} name = "startDate" id = "startDate" placeholder='Start Date' onChange = {handleChange}/>
          </div>

          <div>
              <label htmlFor='studyMode'>Study Mode</label>
              <input type="text" value = {input.studyMode} name = "studyMode" id = "studyMode" placeholder='Study Mode' onChange = {handleChange}/>
          </div>

          <div>
              <label htmlFor='apply'>How To Apply</label>
              <input type="text" value = {input.apply} name = "apply" id = "apply" placeholder='How To Apply' onChange = {handleChange}/>
          </div>

          <div>
              <label htmlFor='email'>Email</label>
              <input type="text" value = {input.email} name="email" id="email" placeholder='Admissions Or Program Director Email' onChange={handleChange} />
          </div>

          <div>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input type="text" value = {input.phoneNumber} name="phoneNumber" id="phoneNumber" placeholder='Program Director Phone Number' onChange={handleChange} />
              
          </div>

          <div>
              <label htmlFor='programDirector'>Program Director</label>
              <input type="text" value = {input.programDirector} name="programDirector" id="Program Director Name" placeholder='Program Director Name' onChange={handleChange} />
              
          </div>
    </form>
  )
}

export default Tap2