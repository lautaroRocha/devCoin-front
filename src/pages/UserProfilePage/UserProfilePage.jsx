import React, { useRef, useState, useContext} from 'react';
import { Balance, ProfileModal } from '../../components';
import { AppWrap } from '../../wrapper';
import { sessionContext } from '../../context';
import { Navigate } from 'react-router-dom';
import * as Icons from '../../utils/icons';

const UserProfilePage = (props) => {

    const { user } = useContext(sessionContext);

    const [editing, setEditing] = useState(false);

    const userPicture = useRef();

    function editContent() {
        setEditing(true);
    }



    function changeEditState(){
        setEditing(!editing)
    }

    if (user && user.verified_user) {
        return (
            <div className="relative flex h-full w-full flex-col items-center md:items-start md:overflow-x-hidden overflow-y-clip">
                {editing && <ProfileModal changeEdit={changeEditState} updateUser={props.props.update}/>}

                <div
                    className={`flex h-full w-full flex-col items-center md:items-start ${
                        editing && 'z-0 blur-sm'
                    }`}
                >
                    {/* PÁGINA CON BLUR */}
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <div className="mt-[1rem] flex w-full flex-col md:flex-row">
                        <div className="glass relative flex w-full flex-col items-center justify-between gap-6 rounded-md py-6 text-center text-white sm:flex-row sm:justify-center sm:gap-x-[2rem] md:w-[60%] md:justify-start md:gap-x-[2rem] md:pl-4 lg:gap-x-[3rem] xl:gap-x-[4rem]">
                            <div
                                className={`h-32 w-32 rounded-full bg-white sm:ml-[1rem] ${
                                    editing && 'sm:ml-[1rem]'
                                }`}
                                ref={userPicture}
                            >
                                <img
                                    src={props.props.url}
                                    alt="userPicture"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col text-black dark:text-white sm:items-start">
                                <div className="flex max-500:flex-col">
                                    <h1
                                        className="text-3xl font-bold max-500:px-3 500:pr-3"
                                        id="user-value"
                                    >
                                        {user.first_name}
                                    </h1>
                                    <span
                                        className="text-3xl font-bold max-500:px-3"
                                        id="user-value"
                                    >
                                        {user.last_name}{' '}
                                    </span>
                                </div>
                                <span className=" italic max-sm:mt-[1rem] sm:mt-[0.5rem] md:pl-1">
                                    #{user.hex_code}
                                </span>
                            </div>

                            <span onClick={editContent}>{Icons.edit}</span>
                        </div>
                        <div className="md:glassMoney mt-4 flex h-[4rem] w-full items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] dark:bg-gray-800/50 dark:text-white max-350:px-[0.5rem] md:ml-5 md:mt-0 md:h-full md:w-[40%]">
                            <span>{Icons.bill}</span>
                            <span className="ml-auto text-2xl font-bold lg:text-4xl">
                                ${props.props.wallet.balance}
                            </span>
                        </div>
                    </div>
                    <Balance />{' '}
                </div>
            </div>
        );
    } else {
        return <Navigate to="/" replace={true} />;
    }
};

export default AppWrap(UserProfilePage);
