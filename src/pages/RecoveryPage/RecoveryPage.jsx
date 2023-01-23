import React from 'react';
import { AppWrap } from '../../wrapper';
import * as URL from '../../utils/URL'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const RecoveryPage = () => {

    const email = useParams()
    const navigate = useNavigate()


    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl ">
            <h1 className="text-center text-3xl font-semibold">Reestablecer contraseña</h1>
        <form className="mt-6" >
        <div className="mb-2 flex flex-col gap-y-2">
            <label htmlfor="new-pass" className="block text-sm font-semibold">
                Nueva contraseña 
                <input
                    id="new-pass"
                    type="password"
                    className="w-full rounded-xl py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                />
            </label>
        </div>
        <div className="mb-2 flex flex-col gap-y-2">
            <label for="password" className="block text-sm font-semibold">
                Repetir contraseña
                <input
                    type="password"
                    className="w-full rounded-xl px-4 py-2 focus:outline-none dark:bg-black/90"
                />
            </label>

        </div>

        <div className="mt-6">
            <button className="buttons w-full">Confirmar</button>
        </div>
        </form>
        </div>
        </div>
    );
}

export default AppWrap(RecoveryPage);
