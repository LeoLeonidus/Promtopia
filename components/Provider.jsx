"use client"

import { SessionProvider } from 'next-auth/react'

import {useState,useEffect} from 'react';

const Provider = ({ children , session }) => {

  const [mounted,setMounted] = useState(false);

  useEffect( () => {
    setMounted(true)
    },[]);

    if (!mounted) return <></> ;


  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider