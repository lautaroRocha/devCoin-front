import React, { useState } from 'react';
import { AppWrap } from '../../wrapper';
import { Link } from 'react-router-dom';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';
import * as Icons from '../../utils/icons'

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleRememberSession = (user, token) => {
        if (remember) {
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', token);
        }
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        const userData = {
            email: email,
            password: password,
        };
        fetch(URL.login, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if(data.message){
                    toast.error(data.message)
                }else{
                    props.props.logIn(data.user, data.tokenAccess)
                    handleRememberSession(data.user, data.tokenAccess)
                }
            })
            .catch((error) => console.error(error));
    };

    const sendRecoveryEmail = () => {
        fetch()
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
            <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl ">
                <h1 className="text-center text-3xl font-semibold">Iniciar sesión</h1>
                <form className="mt-6" onSubmit={handleSubmitLogin}>
                    <div className="mb-2 flex flex-col gap-y-2">
                        <label htmlfor="email" className="block text-sm font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="w-full rounded-xl py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-2 flex flex-col gap-y-2">
                        <label for="password" className="block text-sm font-semibold">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl px-4 py-2 focus:outline-none dark:bg-black/90"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="flex w-full gap-x-2">
                        <input
                            id="remember"
                            type="checkbox"
                            onChange={() => {
                                setRemember(!remember);
                            }}
                        />
                        <label htmlFor="remember">Recordarme</label>
                    </div>
                    <Link
                        to={`/recovery/${email}`}
                        className="text-xs text-purple-600 hover:underline dark:text-indigo-400"
                    >
                        ¿Quieres restablecer la contraseña?
                    </Link>
                    <div className="mt-6">
                        <button className="buttons w-full">Ingresar</button>
                    </div>
                </form>
                <div className="flex justify-between">
                    <div className="relative mt-6 flex w-[45%] items-center justify-center border border-t" />
                    <div className="translate-y-3">O</div>
                    <div className="relative mt-6 flex w-[45%] items-center justify-center border border-t" />
                </div>
                <div className="mt-4 flex gap-x-2">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-violet-600 focus:ring-offset-1 dark:hover:bg-white dark:hover:text-black"
                    >
                    {Icons.google}
                    </button>
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-violet-600 focus:ring-offset-1 dark:hover:bg-white dark:hover:text-black">
                     {Icons.twitter}
                    </button>
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-violet-600 focus:ring-offset-1 dark:hover:bg-white dark:hover:text-black">
                       {Icons.github}
                    </button>
                </div>

                <div className="mt-4 flex w-full flex-col items-start 500:w-[19rem] md:mx-auto">
                    <p>
                        ¿No tienes una cuenta? crea una{' '}
                        <Link
                            to="/signup"
                            className="text-secondary hover:underline dark:text-indigo-400"
                        >
                            aquí!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppWrap(LoginPage);
