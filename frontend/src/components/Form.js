import React from 'react'

function Form({action,children}) {
    

   

  return (
    <div className='form-page'>
      <div className='form-wrapper'>
        <h4 className='from-title'>{action}</h4>
        {children}
      </div>

    </div>
  )
}

export default Form