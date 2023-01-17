import React, { useRef, useState } from 'react';
import { Balance } from '../../components';
import { AppWrap } from '../../wrapper';

const UserProfilePage = () => {
    const [editing, setEditing] = useState(false);

    // esto después se levantaría de props o context
    const [user, setUser] = useState({
        username: 'Lucas Ordoñez',
        email: 'lucasdev@gonza.com',
    });

    const userPicture = useRef();
    const userName = useRef();
    const userEmail = useRef();

    // por ahora solo edita, después también tiene que hacer
    // un patch a la base de datos
    function editContent() {
        setEditing(true);

        const editableName = document.createElement('textarea');
        editableName.className =
            'font-extrabold text-4xl w-10/12 h-fit bg-primary dark:vg-primary/90 text-center md:w-fit md:p-0';
        editableName.textContent = user.username;

        const editableEmail = document.createElement('textarea');
        editableEmail.className =
            'w-3/5 h-7 bg-primary dark:vg-primary/90 text-center italic text-base md:w-fit';
        editableEmail.textContent = user.email;
        userPicture.current.style.display = 'none';
        userName.current.replaceWith(editableName);
        userEmail.current.replaceWith(editableEmail);
    }

    function saveEditedContent() {
        const newValues = document.querySelectorAll('textarea');
        setUser({
            username: newValues[0].value,
            email: newValues[1].value,
        });
        console.log(user);
        newValues[0].replaceWith(userName.current);
        newValues[1].replaceWith(userEmail.current);
        userPicture.current.style.display = 'block';
        setEditing(false);
    }
    return (
        <>
            <div className="flex h-full w-full flex-col items-center">
                <div className="relative mt-6 flex w-9/12 flex-col items-center justify-between gap-6 rounded-xl bg-primary/90 py-7 text-center text-white dark:bg-primary/90 md:flex-row">
                    <div
                        className="aspect-squaren ml-5 h-32 w-32 rounded-full bg-red-900"
                        ref={userPicture}
                    />
                    <h1 className="px-3 text-4xl font-extrabold" ref={userName} id="user-value">
                        {user.username}
                    </h1>
                    <span className="text-base italic md:mr-5" ref={userEmail} id="user-value">
                        {user.email}
                    </span>
                    {editing ? (
                        <span
                            className="absolute top-5 right-12 font-semibold hover:cursor-pointer"
                            onClick={saveEditedContent}
                        >
                            GUARDAR
                        </span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute top-5 right-5 h-6 w-6 stroke-white hover:border-spacing-60 hover:cursor-pointer hover:stroke-alternative "
                            onClick={editContent}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    )}
                </div>
                <Balance />
            </div>
        </>
    );
};

export default AppWrap(UserProfilePage);
