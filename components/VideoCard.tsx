import React, {useRef, useState} from 'react';
import {Video} from '../types';
import {NextPage} from 'next';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import Link from 'next/link';
import LikeButton from './LikeButton';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import axios from 'axios';
import Comments from './Comments';


interface IProps {
  videoPost: Video
}

const videoCard: NextPage<IProps> = ({videoPost}) => {
  const [post, setPost] = useState(videoPost);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const { userProfile }: any = useAuthStore();

  console.log(post.comments)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment('');
        setIsPostingComment(false);
      }
    }
  };

  return (
    <div className='bg-white rounded-lg w-auto h-auto flex flex-col ml-6 md:ml-8 shadow-lg mb-8 md:mr-16 mr-7'>
        <div className='flex items-center gap-3 p-7'>
            <img src={post?.postedBy?.image} alt="profile-image" className='w-12 h-auto rounded-full' />
            <div className='flex flex-col'>
              <div className='flex gap-1 items-center'>
                <span className='font-semibold'>{post?.postedBy?.userName}</span>
                <span className='text-blue-400'><GoVerified/></span>
              </div>
              <h1 className='underline'>{post?.caption}</h1>
            </div>
        </div>

        <p className='ml-8 md:ml-[5.7rem] px-2'>{post.description}</p>

        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='relative'>
        
          <video
            loop
            ref={videoRef}
            className='p-8 pb-0 w-full mb-5'
            src={post?.video?.asset?.url}>
          </video>
          
          {hover && (
            <div className='absolute cursor-pointer flex lg:gap-10 gap-5 lg:left-20 lg:bottom-14 left-10 bottom-10'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
        <div className='mt-0 px-10'>
            {userProfile && <LikeButton
              likes={post.likes}
              flex='flex'
              handleLike={() => handleLike(true)}
              handleDislike={() => handleLike(false)}
            />}
        </div>

        <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          comments={post.comments}
          isPostingComment={isPostingComment}
        />

    </div>
  )
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { videoPost: res.data },
  };
};

export default videoCard