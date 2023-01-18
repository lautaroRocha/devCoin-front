import React, { useState } from 'react';
import { AppWrap } from '../../wrapper';
import { Link } from 'react-router-dom';
import * as URL from "../../utils/URL"

const LoginPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        //crear un objeto con los datos de usuario
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
            .then( data => {
                    console.log(data.user)
                    props.props.logIn(data.user, data.token)
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-neutral-200/70 shadow-lg dark:bg-neutral-800/80 md:h-[40rem] md:flex-row 1150:w-[60rem] 2xl:w-[75rem]">
                <div className="flex max-md:max-h-[50%] md:w-full md:justify-center">
                    <img
                        src="/login-image.svg"
                        alt="login"
                        className="w-full max-md:max-w-[20rem] md:max-w-[30rem]"
                    />
                </div>
                <div className="max-md:max-h-[50%] max-md:px-4 max-md:py-8 md:w-full">
                    <form
                        onSubmit={handleSubmitLogin}
                        className="flex w-full flex-col items-center justify-center gap-4 500:w-[19rem] md:mx-auto"
                    >
                        <h1 className="mb-5 text-xl font-bold">Iniciar sesión</h1>
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="w-full rounded-xl py-2 px-4 focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="">Contraseña</label>
                            <input
                                type="password"
                                className="w-full rounded-xl px-4 py-2 focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="flex w-full gap-x-2">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember" className="dark:bg-black/90 dark:text-white">
                                Recordarme
                            </label>
                        </div>
                        <button className="home-buttons mt-1 w-full">Ingresar</button>
                    </form>
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
                        <Link to="#" className="hover:underline">
                            ¿Quieres restablecer la contraseña?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppWrap(LoginPage);
