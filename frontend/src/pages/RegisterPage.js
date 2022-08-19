import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from '../components/Form'
import { validateData } from '../utils'
import Store from '../components/Store'

function RegisterPage() {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [Error,setError] = useState('')
  const [input, setInput] = useState({name:'',email:'',password:'',confirmPassword:''})
  const {state,dispatch} = useContext(Store)
    
  const handleChange = (e) => {
        const name = e.target.name;
      const value = e.target.value;
        setInput(values=> ({...values,[name]:value}))
  }
  



   const handleSubmit = (e) => {
     e.preventDefault()
     const { name, email, password, confirmPassword } = input
     if (!validateData(nameRef,setError) || !validateData(emailRef,setError) || !validateData(passwordRef,setError) || !validateData(confirmPasswordRef,setError)) {
       return
     } else if (password !== confirmPassword) {
       setError('The two passwords are not equal')
     } else {
       axios.post('/api/admin/register', {
                name,
                email,
              password
                
       }).then(res => {
               console.log(res.data)
               dispatch({ type: 'LOGIN', payload: res.data })
                navigate('/')
       }).catch(err => {
               const error = err.response?err.response.data.ERROR : err.message
               setError(error)
             })
     }
     
  }
  
  useEffect(() => {
    if (state.adminInfo) {
      navigate('/')
    }
  },[navigate,state.adminInfo])
  

  return (
    <Form action='Register'>
      {Error && <div style={{color:'red',textAlign:'center',fontWeight:'bold'}}>{Error}</div>}
      <form className='form' onSubmit={handleSubmit}>
        <div className='tap'>
          <p>
            <label htmlFor='name'>Full Name</label>
            <input type='text' name='name'
          onKeyUp={() => validateData(nameRef,setError)}
          ref={nameRef} id='0' value={input.name}
          onChange={handleChange}required />
            <span>Enter Your Full Name</span>
          </p>

          <p>
            <label htmlFor='email'>Email</label>
            <input type='email' onKeyUp={() => validateData(emailRef,setError)}
          ref={emailRef} name='email' id='1' value={input.email}onChange={handleChange} required />
          <span>Email can only contain letters, @ and _</span>
          </p>

          <p>
            <label htmlFor='password'>Password</label>
              <input type='password' ref={passwordRef} name='password' id='2' value={input.password}
          onChange={handleChange} minLength={8} required onKeyUp={() => validateData(passwordRef,setError)} />
          <span>Password must be atleast 8 chatracers without invalid inputs</span>
          </p>
          
          <p>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type='password' name='confirmPassword' ref={confirmPasswordRef} 
          value={input.confirmPassword} onChange={(e)=>handleChange(e)}
          required id='3' onKeyUp={() => validateData(confirmPasswordRef,setError)} />
          <span>Password must be atleast 8 chatracers without invalid inputs</span>
          </p>
          <div style={{fontWeight:'bold'}}>Already have account? <Link to='/login'>Login</Link></div>
        </div>
        
        <div className='btn'>
            <button type='submit' >Register</button>

        </div>
        </form>
          
    </Form>
          
  )
}

export default RegisterPage