import React from 'react'
import { Navbar } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectUserState } from 'src/redux/slices/user-slice'

export function NickProfile () {
  const userState = useSelector(selectUserState)

  if (!userState) return null

  return (
    <Navbar.Text>
      <FaUserCircle className="me-2" />
      {userState.username}
    </Navbar.Text>
  )
}
