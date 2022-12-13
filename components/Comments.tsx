import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();
  const [readMore, setReadMore] = useState(false)
console.log(allUsers)
  return (
    <div className=' border-gray-200 pt-4 px-4 mt-0 border-b-2 lg:pb-0 '>
      {userProfile && <div className=' bottom-0 left-0  pb-6 px-2 md:px-10 '>
        <form onSubmit={addComment} className='flex sm:flex-row flex-col gap-4'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value.trim())}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-auto md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <button className='text-md text-gray-400 sm:text-right text-left' onClick={addComment}>
            {isPostingComment ? 'Commenting...' : 'Comment'}
          </button>
        </form>
      </div>}

      {comments ? <button onClick={() => setReadMore(!readMore)} className='ml-10 text-blue-400 font-semibold mb-4'>read comments</button> : 
      null}
      
      <div className='h-auto pb-8 ml-9'>
        {comments?.length > 0 ? (
          comments?.map((item: IComment, idx: number) => (
            <div key={idx}>
            {readMore && 
              <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 items-center' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-10 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-400' />
                          </p>
                        </div>
                      </Link>
                      <div>              
                      </div>
                    </div>
                  )
              )}
              <p className='mt-0 ml-[4.2rem] text-[16px] mr-8 mb-5'>
                 {item.comment}
              </p>
            </>}
            </div>
            
          ))
        ) : (
          <p>no comments</p>
        )}
      </div>
     
    </div>
  );
};

export default Comments;