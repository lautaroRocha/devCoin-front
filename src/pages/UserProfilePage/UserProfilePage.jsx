import React, { useRef, useState, useContext, useEffect } from 'react';
import { Balance } from '../../components';
import { AppWrap } from '../../wrapper';
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import { Navigate } from 'react-router-dom';
import * as Icons from '../../utils/icons';
import axios from 'axios';
import { users } from '../../utils/URL';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';
import getProfilePictureURL from '../../utils/getProfilePicURL';



const UserProfilePage = (props) => {

    const token = useContext(tokenContext);
    const user = useContext(userContext);

    const storage = getStorage()
    const storageRef = user && ref(storage, `images/${user.email}-profilepic`);

    const [editing, setEditing] = useState(false);

    const [nameUpdated, setNameUpdated] = useState(user && user.first_name);
    const [lastNameUpdated, setLastnameUpdated] = useState(user && user.last_name);
    const [phoneNumberUpdated, setPhoneNumberUpdated] = useState(user && user.phone);
    const [addressUpdated, setAddressUpdated] = useState(user && user.address);
    const [passwordUpdated, setPasswordUpdated] = useState();

    const userPicture = useRef();
    const newPhoto = useRef()

    function editContent() {
        setEditing(true);
    }

    async function uploadToStorage(ref, file){
        if(!file){
            toast.error("No se ha detectado ningun archivo")
        }else{
            const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true,
            convertSize: 500,
            convertTypes: ['image/png', 'image/webp', 'image/jpg']
            }
            const compressedFile = await imageCompression(file, options);
            await uploadBytes(ref, compressedFile).then((snapshot) => {
                toast.info('Estamos subiendo tu foto...');
            });
        }
        }

 
  


    function updateContentEdited(event) {
        event.preventDefault();
        const updateData = {
            first_name: nameUpdated,
            last_name: lastNameUpdated,
            address: addressUpdated,
            phone: phoneNumberUpdated,
        }
        axios.put(users + `/${user.hex_code}`, updateData, { headers: { 'x-access-token': token} })
            .then( res => props.props.update())
            .catch( error => console.log(error))
        if(newPhoto.current.files[0] !== undefined){
            const newFile = newPhoto.current.files[0] 
            uploadToStorage(storageRef, newFile)
        }
        setEditing(false);
    }

    if (user && user.verified_user) {
        return (
            <div className="relative flex h-full w-full flex-col items-center overflow-x-hidden md:items-start">
                {editing && (
                    <>
                        {/* FORMULARIO PARA CAMBIAR DATOS */}
                        <div className="absolute z-10 flex h-full w-full items-center justify-center">
                            <form
                                onSubmit={updateContentEdited}
                                className="h-[43rem] w-[35rem] rounded-md bg-white/90 px-[2rem] py-[2rem] shadow-lg dark:bg-black/90 500:h-[36rem]"
                            >
                                <div
                                    className="flex w-full cursor-pointer justify-end"
                                    onClick={(e) => setEditing(false)}
                                >
                                    {Icons.close}
                                </div>

                                <h1 className="mb-8 text-center text-2xl font-semibold">
                                    Actualizar datos
                                </h1>

                                <div className="flex flex-col gap-y-3">
                                    <input type="file" className="flex w-full" ref={newPhoto}/>

                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="name">Nombre</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={nameUpdated}
                                            className="w-full rounded-md bg-indigo-700/30 py-2 px-4 text-black focus:outline-none dark:text-white"
                                            onChange={(event) => setNameUpdated(event.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="lastname">Apellido</label>
                                        <input
                                            id="lastname"
                                            type="text"
                                            value={lastNameUpdated}
                                            className="w-full rounded-md bg-indigo-700/30 py-2 px-4 text-black focus:outline-none dark:text-white"
                                            onChange={(event) =>
                                                setLastnameUpdated(event.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2 500:flex-row">
                                        <div>
                                            <label htmlFor="phone">Telefono</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                value={phoneNumberUpdated}
                                                className="w-full rounded-md bg-indigo-700/30 py-2 px-4 focus:outline-none dark:text-white"
                                                onChange={(event) =>
                                                    setPhoneNumberUpdated(event.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="address">Dirección</label>
                                            <input
                                                id="address"
                                                type="text"
                                                value={addressUpdated}
                                                className="w-full rounded-md bg-indigo-700/30 py-2 px-4 focus:outline-none dark:text-white"
                                                onChange={(event) =>
                                                    setAddressUpdated(event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <label htmlFor="password">Contraseña</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="w-full rounded-md bg-indigo-700/30 py-2 px-4 text-black focus:outline-none dark:text-white"
                                            onChange={(event) =>
                                                setPasswordUpdated(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <button className="buttons mt-8 w-full">Actualizar</button>
                            </form>
                        </div>
                        {/* FIN FORMULARIO PARA CAMBIAR DATOS */}
                    </>
                )}

                <div
                    className={`flex h-full w-full flex-col items-center md:items-start ${
                        editing && 'z-0 blur-sm'
                    }`}
                >
                    {/* PÁGINA CON BLUR */}
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <div className="mt-[1rem] flex w-full flex-col md:flex-row">
                        <div className="glass relative flex w-full flex-col items-center justify-between gap-6 rounded-md py-6 text-center text-white sm:flex-row sm:justify-center sm:gap-x-[2rem] md:w-[70%] md:justify-start md:gap-x-[2rem] md:pl-4 lg:w-[60%] lg:gap-x-[3rem] xl:gap-x-[4rem]">
                            <div
                                className={`h-32 w-32 rounded-full bg-white sm:ml-[1rem] ${
                                    editing && 'sm:ml-[1rem]'
                                }`}
                                ref={userPicture}
                            >
                                <img
                                    src={props.props.url}
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
                                <span className="text-sm italic max-sm:mt-[1rem] sm:mt-[0.5rem] md:pl-1">
                                    Admin
                                </span>
                            </div>

                            <span onClick={editContent}>{Icons.edit}</span>
                        </div>
                        <div className="glassMoney ml-4 hidden h-full w-[40%] items-center justify-start gap-x-4 rounded-lg px-[4rem] text-black dark:text-white md:flex">
                            {Icons.bill}
                            <span className="ml-auto text-4xl font-bold">
                                ${props.props.wallet.balance}
                            </span>
                        </div>
                        <div className="mt-4 flex h-[4rem] w-full items-center justify-start gap-x-4 rounded-lg bg-gray-900/90 px-[4rem] text-white dark:bg-gray-800/50 max-350:px-[0.5rem] md:hidden">
                            {Icons.bill}
                            <span className="ml-auto text-2xl font-bold">
                                ${props.props.wallet.balance}
                            </span>
                        </div>
                    </div>
                    <Balance />{' '}
                </div>
            </div>
        );
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};

export default AppWrap(UserProfilePage);
