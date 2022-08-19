import React, { useContext } from 'react'
import Store from './Store'
import LoginPage from '../pages/LoginPage'

function IsAuth({children}) {
    const {state} = useContext(Store)
  return (
      <>
          {state.adminInfo? children : <LoginPage/>}
      </>
  )
}

export default IsAuth