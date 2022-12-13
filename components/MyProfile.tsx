import React, {useState} from 'react';
import {Video} from '../types';
import {IUser} from '../types';
import {NextPage} from 'next';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import {TbDoorExit} from 'react-icons/tb';
import Logo from '../utils/login/login.png';
import Image from 'next/image';
import {FcRating} from 'react-icons/fc';
import {IoMdAdd} from 'react-icons/Io'
import {createOrGetUser} from '../utils';
import useAuthStore from '../store/authStore';
import Link from 'next/link';

interface IProps {
  post: Video;
  user: IUser
}

const MyProfile: NextPage<IProps> = ({post}) => {
  const {userProfile, addUser, removeUser} = useAuthStore();
  console.log(userProfile)
  
  return (
    <div className='flex xl:flex-col flex-row text-4xl w-full xl:w-80 h-24 xl:h-screen bg-white fixed top-0 left-[4.2rem] md:left-[7rem] xl:left-auto xl:right-0 container py-3 xl:py-10 px-5 '>

      {!userProfile ? (
        <div className='hidden xl:block'>
        <p className='font-semibold text-blue-500 text-center mt-8'>Start your<br/>journey with us</p>

        <p className='text-lg leading-6 text-center mt-6 font-semibold'>We are the leading free speech video/text sharing platform! Join our growing community</p>
  
        <div className='absolute top-72 flex gap-1 px-9'><FcRating /><FcRating /><FcRating /><FcRating /><FcRating /></div>
          <div className='w-96 h-auto cursor-pointer pr-20 mt-32'>
              <Image
                src={Logo}
                alt='logo'
                className='cursor-pointer'
                layout='responsive'/>
          </div>
        </div>
      ) : (
        <div className='px-5 flex flex-row xl:flex-col xl:w-full items-center'>
          <h1 className='xl:text-3xl text-2xl w-full font-semibold text-purple-700 lg:block hidden'>My Profile</h1>
        <div className='w-full h-52 xl:bg-[#d696ee] rounded-lg xl:flex xl:justify-center xl:mt-8 xl:shadow-xl'>

        <img src={userProfile.image} alt="image-logo" className='shadow-xl rounded-full mt-[4.5rem] xl:mt-8 w-16 lg:w-20 xl:w-40 h-auto my-auto'/>

        </div>

        <h1 className='text-xl font-semibold mt-2 xl:mt-4 w-full lg:block hidden'>{userProfile?.userName}</h1>

        <div className='flex gap-5 md:gap-10 xl:mt-28 justify-center xl:ml-0 ml-5 bg-slate-200'>
            <Link href='/upload'>
              <button className='border-2 px-0 py-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-2xl xl:text-4xl' />{' '}
                <span className='hidden md:block text-2xl'>Upload</span>
              </button>
            </Link>
            </div>

        </div>
      )}

      <div className='xl:absolute xl:bottom-14 mt-3 xl:mt-0'>
      {userProfile ? (
        <div onClick={() => {googleLogout();removeUser();}} className='flex items-center text-white xl:px-5 xl:ml-[4rem] shadow-md bg-red-400 border-dotted p-3 rounded-lg hover:bg-white hover:text-red-500 ease-in-out duration-200'>

        <TbDoorExit className='text-2xl'/>
        <button className='text-start font-semibold pl-5 text-lg hidden md:block' >Logout</button>
        </div>
      ) : (
        <div className='ml-5'>
        <GoogleLogin 
          onSuccess={(response) => 
          createOrGetUser(response, addUser)}
          onError={() => console.log('Error')} 
        />
        </div>
      )}
      </div>
    </div>
  )
}

export default MyProfile