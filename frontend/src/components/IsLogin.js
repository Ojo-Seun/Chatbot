import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Store from './Store'

function IsLogin() {
    const {state} = useContext(Store)
  return (
      <>{
          state.adminInfo ? <Link className='link-btn' to='/dashboard/overview'>DASHBOARD</Link>: <Link className='link-btn' to='/login'>ADMIN LOGIN</Link>
      }</>
  )
}

export default IsLogin