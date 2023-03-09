/* eslint-disable no-unused-vars */
import React from 'react'
import './header.scss'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Header () {
  const navigate = useNavigate()

  function hendleclick () {
    navigate('/registration')
  }

  return (
    <div className='header'>
      <div className='registration-icon'>
        <FaUserAlt onClick={() => hendleclick()} />
      </div>
    </div>
  )
}

export default Header
