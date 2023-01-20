import React, { useState } from 'react';
import { AppWrap } from '../../wrapper';
import { Link } from 'react-router-dom';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';

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
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline dark:text-indigo-400"
                    >
                        ¿Quieres restablecer la contraseña?
                    </a>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="h-5 w-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-violet-600 focus:ring-offset-1 dark:hover:bg-white dark:hover:text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="h-5 w-5 fill-current"
                        >
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    </button>
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 transition-colors hover:bg-black hover:text-white focus:ring-2 focus:ring-violet-600 focus:ring-offset-1 dark:hover:bg-white dark:hover:text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="h-5 w-5 fill-current"
                        >
                            <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                        </svg>
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
