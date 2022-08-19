import React from 'react'
import { Link } from 'react-router-dom'

function NoPage() {
  return (
      <h2 style={{ textAlign: "center", color: "white" }}>
          <span>Page Not Found Go to..   </span>
          <Link to="/">Home Page</Link>
    </h2 >
  )
}

export default NoPage