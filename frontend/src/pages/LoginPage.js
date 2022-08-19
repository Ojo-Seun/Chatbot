import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Store from '../components/Store'
import { validateData } from '../utils'
import axios from 'axios'
import Form from '../components/Form'

function LoginPage() {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()
  const [input, setInput] = useState({email:'',password:''})
  const { state, dispatch } = useContext(Store)
  const [Error,setError] = useState('')
    





    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values=> ({...values,[name]:value}))
  }
  
   const handleSubmit = (e) => {
     e.preventDefault()
     const { email, password } = input
     if (!validateData(emailRef,setError) || !validateData(passwordRef,setError)) {
       setError('You must fill all the fields')
       return
     }
     axios.post('http://localhost:5000/api/admin/login', {
                email,
                password
             }).then(res => {
               dispatch({ type: 'LOGIN', payload: res.data })
               
                navigate('/dashboard/overview')
             }).catch(err => {
               const error = err.response? err.response.data.ERROR: err.message
               setError(error)
               
               
             })
  }
  useEffect(() => {
    if (state.adminInfo) {
      navigate('/')
    }
  },[navigate,state.adminInfo])
  
  return (
    <Form action='Login'>
        {Error && <div style={{color:'red',textAlign:'center',fontWeight:'bold'}}>{Error}</div>}  
        <form className='form' onSubmit={handleSubmit}>
          <div className='tap'>
            <p>
            <label htmlFor='email'>Enter Email</label>
              <input type='email' onKeyUp={() => validateData(emailRef,setError)} id='0' name='email' ref={emailRef} value={input.email} onChange={handleChange} required />
              <span>Email can only contain letters, numbers @ and _</span>
          </p>

          <p>
            <label htmlFor='password'>Enter Password</label>
            <input type='password' name='password' id='1' ref={passwordRef} value={input.password}
            onChange={handleChange} required
            onKeyDown={() => validateData(passwordRef,setError)} />
             <span>Password must be atleast 8 chatracers without invalid inputs</span> 
          
          </p>
          

          </div>
          <div className='btn'>
            <button type='submit'>Login</button>

          </div>
          
        </form>
    </Form>
  )
}

export default LoginPage