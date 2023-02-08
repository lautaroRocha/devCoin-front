import React, { useState, useRef } from 'react';
import { AppWrap } from '../../wrapper';
import { Link } from 'react-router-dom';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';
import { EyeIcon } from '../../components';
import { changePasswordInputType } from '../../utils/changePassType';
import { AES, enc } from 'crypto-js';


const DEFAULT_PICTURE =
    'https://img.freepik.com/vector-gratis/fondo-azul-galaxia_125540-99.jpg?w=2000';

function SignUpPage() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const passInput = useRef();

    const handleSubmitRegister = (event) => {
        event.preventDefault();

        let cipherText = AES.encrypt(newEmail.slice(0, -4), 'secret').toString();
        let ciphered64 = enc.Base64.parse(cipherText);
        let cipheredMail = ciphered64.toString(enc.Hex);

        const newUser = {
            first_name: name,
            last_name: lastname,
            image: DEFAULT_PICTURE,
            email: newEmail,
            password: newPassword,
            address: newAddress,
            phone: phoneNumber,
            link: `https://dev-coin.web.app/verify/${cipheredMail}`,
        };

        fetch(URL.users, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message || data.user.error) {
                    //creamos un array de todos los mensajes de error
                    //usando la coma como punto de separación
                    //y por cada uno tiramos un error toast
                    if(data.message){
                        Array.from(data.message.split(',')).forEach((err) => toast.error(err));
                    }else if(data.user.error){
                        toast.error('El mail y el telefóno deben ser únicos. Si ya tienes una cuenta puedes recuperar tu contraseña desde la pantalla de login')
                    }

                }else{
                    toast.success('Ya estás registrado! Revisá tu correo para verificar tu cuenta');
                    document.getElementById('form').reset();
                }
            })
            .catch((er) => console.log(er));
    };

    return (
        <>
            <div className="flex w-full items-center justify-center md:h-[90vh]">
                <div className="flex h-fit w-full flex-col items-center rounded-md bg-white shadow-lg dark:bg-neutral-800/80 md:flex-row md:p-5 1150:w-[60rem] 2xl:w-[75rem]">
                    <div className="flex flex-col items-center justify-center max-md:mt-10 max-md:max-h-[30%] md:w-full md:gap-y-[4rem] lg:ml-[4rem]">
                        <img
                            src="/register-image.svg"
                            alt="login"
                            className="w-full p-3 max-md:max-w-[20rem] md:max-w-[30rem]"
                        />
                        <p className="hidden px-8 text-center text-xl font-bold md:inline 2xl:px-[8rem]">
                            Crea tu cuenta y empieza a{' '}
                            <span className="text-secondary dark:text-indigo-500">comprar</span> y{' '}
                            <span className="text-secondary dark:text-indigo-500">transferir</span>{' '}
                            monedas!
                        </p>
                    </div>
                    <div className="max-md:max-h-[70%] max-md:px-4 max-md:py-8 md:w-full">
                        <form
                            id="form"
                            onSubmit={handleSubmitRegister}
                            className="flex w-full flex-col items-center justify-center gap-3 500:w-[25rem] md:mx-auto"
                        >
                            <h1 className="mb-1 text-3xl font-semibold">Registro</h1>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full rounded-md py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="lastname">Apellido</label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className="w-full rounded-md py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                    onChange={(event) => setLastname(event.target.value)}
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2 500:flex-row">
                                <div>
                                    <label htmlFor="phone">Telefono</label>
                                    <input
                                        id="phone"
                                        type="text"
                                        className="w-full rounded-md py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                        onChange={(event) => setPhoneNumber(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Dirección</label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="w-full rounded-md py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                        onChange={(event) => setNewAddress(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full rounded-md py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                    onChange={(event) => setNewEmail(event.target.value)}
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label htmlFor="pass" className="relative">
                                    Contraseña
                                    <input
                                        id="pass"
                                        ref={passInput}
                                        type="password"
                                        className="w-full rounded-md px-4 py-2 focus:outline-none dark:bg-black/90 dark:text-white"
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                    <span
                                        onClick={() => {
                                            changePasswordInputType(passInput);
                                        }}
                                        className="absolute top-1 hover:cursor-pointer"
                                    >
                                        <EyeIcon />
                                    </span>
                                </label>
                            </div>
                            <button className="buttons mt-4 w-full">Registrarse</button>
                        </form>
                        <div className="mt-4 flex w-full flex-col items-start 500:w-[19rem] md:mx-auto">
                            <p className="text-center">
                                ¿Ya tienes una cuenta? ingresa{' '}
                                <Link
                                    to="/login"
                                    className="text-secondary hover:underline dark:text-indigo-400"
                                >
                                    aquí!
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppWrap(SignUpPage);
