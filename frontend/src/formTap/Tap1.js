import React, { useEffect, useState } from 'react'
import { formDataValidation } from '../utils'






function Tap1({input, setInput,setFormError }) {


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        formDataValidation(value,setFormError)

        setInput(values => ({ ...values, [name]: value }))
    }


    
  return (
      <form className='form-tap tap1'>
          <div>
              <label htmlFor='title'>Title</label>
              <input type="text" value = {input.title} name = "title" id = "title" placeholder='Title' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='abbr'>Abbreviations</label>
              <input type="text" value = {input.abbr} name = "abbr" id = "abbr" placeholder='Abbreviatinos' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='faculty'>Faculty</label>
              <input type="text" value = {input.faculty} name = "faculty" id = "faculty" placeholder='faculty' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='partTimeDuration'>Part Time Duration</label>
              <input type="text" value = {input.partTimeDuration} name="partTimeDuration" id="partTimeDuration" placeholder='Part-Time Duration' required onChange={handleChange} />
          </div>

          <div>
              <label htmlFor='fullTimeDuration'>Full-Time Duration</label>
              <input type="text" value = {input.fullTimeDuration} name="fullTimeDuration" id="fullTimeDuration" placeholder='Full-Time Duration' required onChange={handleChange} />
              
          </div>



          <div>
              <label htmlFor='description'>Description</label>
              <input type="text" value = {input.description} name = "description" id = "description" placeholder='Description' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='requirement'>Requirement</label>
              <input type="text" value = {input.requirement} name = "requirement" id = "requirement" placeholder='Requirement' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='url'>URL</label>
              <input type="text" value = {input.url} name = "url" id = "url" placeholder='URL' onChange = {handleChange} required/>
          </div>

          <div>
              <label htmlFor='tuition'>Tuition</label>
              <input type="text" value = {input.tuition} name="tuition" id="tuition" placeholder='Tuition' onChange={handleChange} />
          </div>

          <div>
              <label htmlFor='applicationPeriod'>Application Period</label>
              <input type="text" value = {input.applicationPeriod} name="applicationPeriod" id="applicationPeriod" placeholder='Application Period' onChange={handleChange} />
              
          </div>
    </form>
  )
}

export default Tap1