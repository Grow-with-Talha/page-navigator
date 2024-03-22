"use client"
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react';

const SignOutButton = ({children} : { children: React.ReactNode}) => {
  const onClick = () => {
    signOut()
  }
  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default SignOutButton