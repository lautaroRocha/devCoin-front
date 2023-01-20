import React, { useRef, useState, useContext } from 'react';
import { Balance } from '../../components';
import { AppWrap } from '../../wrapper';
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import { Navigate } from 'react-router-dom';
import * as Icons from '../../utils/icons'

const UserProfilePage = () => {
    const [editing, setEditing] = useState(false);

    const token = useContext(tokenContext);
    const user = useContext(userContext);

    const userPicture = useRef();
    const userName = useRef();
    const userLastName = useRef();

    // por ahora solo edita, después también tiene que hacer
    // un patch a la base de datos
    function editContent() {
        setEditing(true);

        const editableName = document.createElement('textarea');
        editableName.className =
            'font-bold text-3xl pt-2 w-full h-full rounded-md text-center resize-none text-black focus:outline-none';
        editableName.textContent = user.first_name;

        const editableLastName = document.createElement('textarea');
        editableLastName.className =
            'font-bold text-3xl pt-2 w-full h-full rounded-md text-center resize-none text-black focus:outline-none';
        editableLastName.textContent = user.last_name;

        // userPicture.current.style.display = 'none';
        userName.current.replaceWith(editableName);
        userLastName.current.replaceWith(editableLastName);
    }

    function saveEditedContent() {
        const newValues = document.querySelectorAll('textarea');
        ///acá iría también el patch a la base de datos
        ///para modificar el user, en esa instancia
        //se puede reemplazar lo de abajo por vovler
        //a fetchear el usuario actualizado
        console.log(user);
        newValues[0].replaceWith(userName.current);
        newValues[1].replaceWith(userLastName.current);
        userPicture.current.style.display = 'block';
        setEditing(false);
    }

    if(user && user.verified_user) {
        return (
            <div className="flex h-full w-full flex-col items-center md:items-start">
                <div className="flex w-full flex-col md:flex-row">
                    <div className="relative flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-b from-indigo-600 to-violet-600 py-6 text-center text-white sm:flex-row sm:justify-center sm:gap-x-[2rem] md:w-[70%] md:justify-start md:gap-x-[2rem] md:pl-4 lg:w-[60%] lg:gap-x-[3rem] xl:gap-x-[4rem]">
                        <div
                            className={`h-32 w-32 rounded-full bg-white sm:ml-[1rem] ${
                                editing && 'sm:ml-[1rem]'
                            }`}
                            ref={userPicture}
                        >
                            <img
                                src={user.image}
                                alt="userPicture"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col sm:items-start">
                            <div
                                className={`flex max-500:flex-col ${
                                    editing &&
                                    'h-[8rem] w-full flex-col gap-y-4 px-4 sm:-ml-[1rem] sm:w-[70%] md:mr-[2rem] md:w-[85%] lg:-ml-[3rem] lg:w-[95%] xl:w-[95%] xl:gap-x-4'
                                }`}
                            >
                                <h1
                                    className="text-3xl font-bold max-500:px-3 500:pr-3"
                                    ref={userName}
                                    id="user-value"
                                >
                                    {user.first_name}
                                </h1>
                                <span
                                    className="text-3xl font-bold max-500:px-3"
                                    id="user-value"
                                    ref={userLastName}
                                >
                                    {user.last_name}{' '}
                                </span>
                            </div>
                            <span
                                className={`text-sm italic md:pl-1 ${
                                    editing
                                        ? 'max-sm:mt-[2rem] sm:mt-[1rem] lg:-ml-[2rem]'
                                        : 'max-sm:mt-[1rem] sm:mt-[0.5rem]'
                                }`}
                            >
                                Admin
                            </span>
                        </div>

                        {editing ? (
                            <span
                                className="absolute top-5 right-12 font-semibold hover:cursor-pointer md:right-5"
                                onClick={saveEditedContent}
                            >
                                Guardar
                            </span>
                        ) : (
                            <span onClick={editContent}>
                                {Icons.edit}
                            </span>
                        )}
                    </div>
                    <div className="ml-4 hidden h-full w-[40%] items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] text-white dark:bg-gray-800/50 md:flex">
                        {Icons.bill}
                        <span className="ml-auto text-4xl font-bold">${user.balance}</span>
                    </div>
                    <div className="mt-4 flex h-[4rem] w-full items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] text-white dark:bg-gray-800/50 max-350:px-[0.5rem] md:hidden">
                        {Icons.bill}
                        <span className="ml-auto text-2xl font-bold">${user.balance}</span>
                    </div>
                </div>

                <Balance />
            </div>
        );
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default AppWrap(UserProfilePage);
