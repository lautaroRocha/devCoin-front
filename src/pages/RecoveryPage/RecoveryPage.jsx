import React, {useState} from 'react';
import { AppWrap } from '../../wrapper';
import * as URL from '../../utils/URL'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const RecoveryPage = () => {

    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const email = useParams()
    const navigate = useNavigate()

    const handleInput = (e, setter) => {
        setter(e.target.value)
    }

    const updatePassword = (e) => {
        e.preventDefault()
        const newPassData = {
            password : newPass
        }
        if(newPass === confirmPass){
            fetch(URL.recoverPass+'/'+email.email+'.com', {
                method : "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(newPassData)
            }).then (res => res.json())
            .then(data => {{
                if(data.error){
                    toast.error(data.error)
                }else{
                    toast.success('Tu contraseña fue actualizada con éxito!')
                    navigate('/login')
                }
            }})
            .catch(error => toast.error(error))
        }else{
            toast.error('Las contraseñas ingresadas no coinciden')
        }
    }




    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl ">
            <h1 className="text-center text-3xl font-semibold">Reestablecer contraseña</h1>
        <form className="mt-6" onSubmit={updatePassword}>
        <div className="mb-2 flex flex-col gap-y-2">
            <label htmlfor="new-pass" className="block text-sm font-semibold">
                Nueva contraseña 
                <input
                    id="new-pass"
                    type="password"
                    className="w-full rounded-xl py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                    onChange={(e)=>{handleInput(e, setNewPass)}}
                />
            </label>
        </div>
        <div className="mb-2 flex flex-col gap-y-2">
            <label for="password" className="block text-sm font-semibold">
                Repetir contraseña
                <input
                    type="password"
                    className="w-full rounded-xl px-4 py-2 focus:outline-none dark:bg-black/90"
                    onChange={(e)=>{handleInput(e, setConfirmPass)}}
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
