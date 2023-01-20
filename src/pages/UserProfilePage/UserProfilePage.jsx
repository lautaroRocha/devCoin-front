import React, { useRef, useState, useContext } from 'react';
import { Balance } from '../../components';
import { AppWrap } from '../../wrapper';
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import { Navigate } from 'react-router-dom';

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute top-5 right-5 h-6 w-6 stroke-white hover:border-spacing-60 hover:cursor-pointer hover:stroke-alternative"
                                onClick={editContent}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="ml-4 hidden h-full w-[40%] items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] text-white dark:bg-gray-800/50 md:flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-[3rem] w-[3rem] min-w-[3rem] text-green-400"
                        >
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path
                                fillRule="evenodd"
                                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                                clipRule="evenodd"
                            />
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                        </svg>

                        <span className="ml-auto text-4xl font-bold">${user.balance}</span>
                    </div>
                    <div className="mt-4 flex h-[4rem] w-full items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] text-white dark:bg-gray-800/50 max-350:px-[0.5rem] md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-[2rem] w-[2rem] min-w-[2rem] text-green-400"
                        >
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                            <path
                                fillRule="evenodd"
                                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                                clipRule="evenodd"
                            />
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                        </svg>

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
