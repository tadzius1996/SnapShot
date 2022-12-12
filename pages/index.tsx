import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import {Video} from '../types';
import VideoCard from '../components/VideoCard';
import MyProfile from '../components/MyProfile';
import useAuthStore from '../store/authStore';
import upload from './upload';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[]
}

export default function Home({videos}: IProps) {
  const {userProfile, addUser, removeUser} = useAuthStore();
  console.log(videos)
  return (
    <div className='flex xl:mr-[17rem] md:ml-[8rem] ml-[4.7rem] xl:ml-52'>
    <div className='bg-[#fafafa] w-full h-auto '>
      
      <div className='p-12 mr-3 xl:mt-0 mt-20'>
        {userProfile ? (<><h1 className=' text-3xl font-semibold text-blue-500 mb-2'>Welcome back, <span className='text-2xl text-slate-900'>{userProfile?.userName}</span> !</h1>
        <span className='font-semibold text-slate-400'>Here are your activities today</span></>) : (
          <h1 className='text-3xl font-semibold text-blue-500 mb-2'>Login to post and comment on videos!</h1>
        )}
         
      </div>

      <div className='flex flex-col gap-1 videos h-auto'>
      {videos.length 
        ? videos?.map((video: Video) => (
          <VideoCard videoPost={video} key={video._id} />
        )) 
        : <div className='mt-44'>
            <p className='h-[80vh] text-center text-3xl font-semibold text-gray-400'>no videos</p>
          </div>}
    </div>
      
    </div>
    <MyProfile post={videos}/>
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};