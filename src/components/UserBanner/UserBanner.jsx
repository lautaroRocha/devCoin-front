import React, {useContext} from 'react';
import { sessionContext } from '../../context';
import * as Icons from '../../utils/icons'

const UserBanner = ({editing, photoUrl, editContent}) => {

    const {user} = useContext(sessionContext)

    return (
        <div className="glass relative flex w-full flex-col items-center justify-between gap-6 rounded-md py-6 text-center text-white sm:flex-row sm:justify-center sm:gap-x-[2rem] md:w-[60%] md:justify-start md:gap-x-[2rem] md:pl-4 lg:gap-x-[3rem] xl:gap-x-[4rem]">
        <div
            className={`h-32 w-32 rounded-full bg-white sm:ml-[1rem] ${
                editing && 'sm:ml-[1rem]'
            }`}
        >
            <img
                src={photoUrl}
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
    );
}

export default UserBanner;
