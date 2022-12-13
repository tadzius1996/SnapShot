import React, {useState} from 'react';
import Logo from '../utils/logo.png';
import Image from 'next/image';
import { categories } from '../utils/constants';
import Link from 'next/link';
import {TbDoorExit} from 'react-icons/tb';
import {useRouter} from 'next/router';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import SuggestedAccounts from './SuggestedAccounts';
import useAuthStore from '../store/authStore';


const SideBar = () => {
    const [active, setActive] = useState(false);
    const [user, setUser] = useState(false);
    const { fetchAllUsers, allUsers }: any = useAuthStore();

    const router = useRouter();
    const {topic} = router.query;

    const listItem = 'flex items-center text-slate-400 h-12 cursor-pointer w-full rounded-xl hover:bg-blue-50 ease-in-out duration-100';
    const activeListItem = 'flex items-center hover:bg-blue-50 bg-blue-100 h-12 cursor-pointer w-full rounded-xl ease-in-out duration-100 border-[#F51997]';


  return (
    <div className='bg-white w-25 md:w-32 xl:w-56 h-screen flex flex-col mr-5 pl-3 md:pl-8 fixed'>
      <Link href='/'>
        <div className='flex items-center mt-9'>
          <div className='w-14 h-auto cursor-pointer'>
              <Image
              src={Logo}
              alt='logo'
              className='cursor-pointer'
              layout='responsive'/>
          </div>
          <h1 className='text-2xl font-semibold text-blue-500 px-1 cursor-pointer hidden xl:block'>SnapShot</h1>
      </div>
      </Link>

      <div className='mt-14 overflow-scroll scrollbar-hidden overflow-x-hidden'>
        {categories.map((category) => (
            <Link href={`/?topic=${category.name}`} key={category.name}>
            <div onClick={() => setActive(true)} className={topic === category.name ? activeListItem : listItem}>
              <span className='p-3 text-2xl rounded-lg'>{category.icon}</span>
              <span className='p-6 text-xl font-semibold hidden xl:block'>{category.name}</span>
            </div>
            </Link>
        ))}
        <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
      </div>

      

    </div>
  )
}

export default SideBar