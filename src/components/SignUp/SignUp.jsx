import React from 'react'
import { Link } from 'react-router-dom';
import { AppWrap } from '../../wrapper';


function SignUp() {
  return (
    <>
            <h2 className="text-3xl mb-4 mt-16">Registro</h2>
            <p className="mb-4">
              Crea tu cuenta y empieza a comprar y transferir criptos 
            </p>
            <form className='lg:w-6/12'>
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Nombre" className="border border-gray-400 py-1 px-2" />
                  <input type="text" placeholder="Apellido" className="border border-gray-400 py-1 px-2" />
                  </div>
                  <div className="mt-5">
                    <input type="email" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" />
                  </div>
                  <div class="mt-5">
                    <input type="password" placeholder="Contraseña" className="border border-gray-400 py-1 px-2 w-full" />
                  </div>
                  <div class="mt-5">
                    <input type="password" placeholder="Confirmar contraseña" className="border border-gray-400 py-1 px-2 w-full" />
                  </div>
                  <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:w-fit md:mx-auto">
                    <button className="home-buttons h-fit">Registrarse</button>
                  <span className='text-center'>¿Ya tenés una cuenta? 
                    <Link to="/login" className='font-semibold'> Iniciar sesión</Link>
                  </span>
                  </div>
              </form>
        </>
  )
}

export default AppWrap(SignUp)