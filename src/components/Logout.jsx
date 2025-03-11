import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/sign-in')
  }
  return (
    <button onClick={handleLogout} className='bg-black text-white px-4 py-2 rounded-xl btn-danger'>Logout</button>
  )
}

export default Logout