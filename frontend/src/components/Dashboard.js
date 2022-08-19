import React from 'react'
import '../dashboard.css'
import { useContext } from 'react'
import { NavLink, Outlet, useNavigate} from 'react-router-dom'
import Store from './Store'

function DashboardPage({children}) {
  const { state, dispatch } = useContext(Store)
  const navigate = useNavigate()
  
  const handleClicked = () => {
    dispatch({ type: "LOGOUT" })
    navigate('/')
    
  }
  return (
    <div className='dashboardPage'>
        <div className='dashboard'>
          <div className='left-bar'>
            <div className='admin'><img src='/admin.png' alt='admin' /><span className='admin-name'>{state.adminInfo.name}</span></div>
            <nav className='menu'>
              <div><NavLink to="/dashboard/overview">Overview</NavLink></div>
            <div><NavLink to="/dashboard/courses">Courses</NavLink></div>
            <div><NavLink to="/dashboard/comments">Comments</NavLink></div>
            <div><NavLink to="/dashboard/QnA">QnAs</NavLink></div>
            
            </nav>
          <Outlet />
         <div className='logout-container'><button type='button' id='sign-out' onClick={handleClicked}>Sign Out</button></div>
        </div>
        <div className='middle-bar'>{children}</div>
        <div className='last-bar'></div>
      </div>
    </div>
    
  )
}

export default DashboardPage