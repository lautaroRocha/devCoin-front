import React, {useRef, useState} from 'react';
import {Balance} from '../../components'
import { AppWrap } from '../../wrapper';

const UserProfile = () => {

    const [editing, setEditing] = useState(false)

    // esto después se levantaría de props o context
    const [user, setUser] = useState(
        {
            username : "Lucas Ordoñez",
            email : "lucasdev@gonza.com"
        }
    )


    const userPicture = useRef()
    const userName = useRef()
    const userEmail = useRef()

    // por ahora solo edita, después también tiene que hacer
    // un patch a la base de datos
    function editContent(){
            setEditing(true)

            const editableName = document.createElement("textarea");
            editableName.className = "font-extrabold text-4xl w-10/12 h-fit bg-primary dark:vg-primary/90 text-center md:w-fit md:p-0"
            editableName.textContent= user.username;

            const editableEmail = document.createElement("textarea");
            editableEmail.className = "w-3/5 h-7 bg-primary dark:vg-primary/90 text-center italic text-base md:w-fit"
            editableEmail.textContent= user.email;
            userPicture.current.style.display = 'none'
            userName.current.replaceWith(editableName)
            userEmail.current.replaceWith(editableEmail)        
    }

    function saveEditedContent(){
       const newValues = document.querySelectorAll('textarea')
       setUser({
        username : newValues[0].value,
        email : newValues[1].value
       })
       console.log(user)
       newValues[0].replaceWith(userName.current)
       newValues[1].replaceWith(userEmail.current)
       userPicture.current.style.display = 'block'
       setEditing(false)
    }
    return (
        <>
        <div className='flex flex-col items-center h-full w-full'>
        <div className='flex flex-col bg-primary/90 dark:bg-primary/90 justify-between rounded-xl items-center gap-6 mt-6 py-7 md:flex-row w-9/12 relative text-center text-white' >
            <div className='w-32 h-32 bg-red-900 rounded-full ml-5 aspect-squaren' ref={userPicture}/>            
            <h1 className='font-extrabold text-4xl px-3' ref={userName} id="user-value">{user.username}</h1>
            <span className='italic text-base md:mr-5' ref={userEmail} id="user-value">{user.email}</span>
            {editing ?
            <span className="absolute top-5 right-12 font-semibold hover:cursor-pointer" onClick={saveEditedContent}>GUARDAR</span>
            :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white absolute top-5 right-5 hover:cursor-pointer hover:border-spacing-60 hover:stroke-alternative " onClick={editContent}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            }
        </div>
        <Balance />
        </div>
        </>
    );
}

export default AppWrap(UserProfile);
