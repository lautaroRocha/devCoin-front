import React, { useState } from 'react';
import { AppWrap } from '../../wrapper';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-neutral-200/70 shadow-lg dark:bg-neutral-800/80 md:h-[40rem] md:flex-row 1150:w-[60rem] 2xl:w-[75rem]">
                <div className="flex max-md:h-[50%] md:w-full md:justify-center">
                    <img
                        src="/login-image.svg"
                        alt="login"
                        className="w-full max-md:max-w-[20rem] md:max-w-[30rem]"
                    />
                </div>
                <div className="max-md:h-[50%] md:w-full">
                    <form
                        onClick={handleSubmitLogin}
                        className="flex w-full flex-col items-center justify-center gap-4 500:w-[19rem] md:mx-auto"
                    >
                        <h1 className="mb-5 text-xl font-bold">Iniciar sesión</h1>
                        <div className="flex w-full flex-col gap-2">
                            <label htmlFor="">Usuario</label>
                            <input
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
                        <div className="flex w-full">
                            <input id="remember" type='checkbox'></input>   
                            <label for='remember' className='focus:outline-none dark:bg-black/90 dark:text-white'>Recordarme</label>                            
                        </div>                                
                        <button className="home-buttons mt-4 w-full">Ingresar</button>  
                        <div className="flex w-full">
                            <a href="#" className='text-center hover:underline'>Restablecer Password?</a>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppWrap(LoginPage);
