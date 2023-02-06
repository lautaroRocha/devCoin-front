import React, {useState, useRef} from 'react';
import { AppWrap } from '../../wrapper';
import * as URL from '../../utils/URL'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { EyeIcon } from '../../components';
import { changePasswordInputType } from '../../utils/changePassType';
import {AES, enc} from 'crypto-js'

const RecoveryPage = () => {

    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const passInput = useRef()
    const confirmPassInput = useRef()


    const cipheredMail = useParams()
    const navigate = useNavigate()

    const handleInput = (e, setter) => {
        setter(e.target.value)
    }

    const updatePassword = (e) => {
        e.preventDefault()
        newPass === confirmPass ? sendNewPassword() : toast.error('Las contraseñas ingresadas no coinciden')
    }

    const decryptEmail = (crypt) => {
        let reb64 = enc.Hex.parse(crypt);
        let bytes = reb64.toString(enc.Base64);
        let decrypt = AES.decrypt(bytes, 'secret');
        let plain = decrypt.toString(enc.Utf8);

        return plain
    }


    const sendNewPassword = () => {
        const newPassData = {
            password : newPass
        }
        const decipheredMail = decryptEmail(cipheredMail.email)+'.com'
        fetch(URL.recoverPass+'/'+decipheredMail, {
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
    }





    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl ">
            <h1 className="text-center text-3xl font-semibold">Reestablecer contraseña</h1>
        <form className="mt-6" onSubmit={updatePassword}>
        <div className="mb-2 flex flex-col gap-y-2">
            <label htmlFor="new-pass" className="block text-sm font-semibold relative">
                Nueva contraseña 
                <input
                    ref={passInput}
                    id="new-pass"
                    type="password"
                    className="w-full rounded-xl py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                    onChange={(e)=>{handleInput(e, setNewPass)}}
                />
                <span onClick={()=>{changePasswordInputType(passInput)}} className="hover:cursor-pointer">
                    <EyeIcon />
                </span>
            </label>
        </div>
        <div className="mb-2 flex flex-col gap-y-2">
            <label htmlFor="password" className="block text-sm font-semibold relative" >
                Repetir contraseña
                <input
                    ref={confirmPassInput}
                    type="password"
                    className="w-full rounded-xl px-4 py-2 focus:outline-none dark:bg-black/90"
                    onChange={(e)=>{handleInput(e, setConfirmPass)}}
                />
                <span onClick={()=>{changePasswordInputType(confirmPassInput)}} className="hover:cursor-pointer">
                    <EyeIcon />
                </span>
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
