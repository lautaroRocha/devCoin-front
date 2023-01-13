import React from 'react';
import {Balance} from '../../components'

const UserProfile = () => {
    return (
        <>
        <div className='flex flex-col bg-slate-400 justify-between	rounded-lg items-center gap-6 mx-auto py-7 md:flex-row w-4/5 relative' >
            <div className='w-32 h-32 bg-red-900 rounded-full ml-5' />            
            <h1 className='font-extrabold text-4xl'>Lucas Ordoñez</h1>
            <span className='mr-5 italic text-base'>lucasorddev@gmail.com</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-blue-500 absolute top-5 right-5 hover:cursor-pointer	">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>

        </div>
        <Balance />
        </>
    );
}

export default UserProfile;
