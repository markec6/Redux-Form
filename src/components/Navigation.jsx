import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div className='flex justify-between h-[90px] items-center'>
        <h2>Logo</h2>
        <ul className='flex justify-center gap-[24px]'>
            <li>
                <Link to={'./'}>Home</Link>
            </li>
            <li>
                <Link to={'./register'}>Register</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navigation