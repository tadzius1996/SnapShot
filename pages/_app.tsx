import '../styles/globals.css'
import React, {useEffect, useState} from 'react'
import type { AppProps } from 'next/app'
import SideBar from '../components/SideBar'
import MyProfile from '../components/MyProfile'
import {GoogleOAuthProvider} from '@react-oauth/google'

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
    <div className='flex overflow-x-hidden'>
        <div className='    w-full'>
          <SideBar />
        <div>
          <Component {...pageProps} />
        </div>
      </div> 
    </div>
    </GoogleOAuthProvider>
  )
}
