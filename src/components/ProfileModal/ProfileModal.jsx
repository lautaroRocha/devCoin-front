import React, { useState, useContext, useRef} from 'react';
import { sessionContext } from '../../context';
import * as Icons from '../../utils/Icons'
import * as URL from '../../utils/URL'
import {toast} from 'react-toastify'
import axios from 'axios';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

const ProfileModal = (props) => {

    const {user, token} = useContext(sessionContext)
    const newPhoto = useRef();

    const storage = getStorage();
    const storageRef = ref(storage, `images/${user.email}-profilepic`);

    const [nameUpdated, setNameUpdated] = useState(user && user.first_name);
    const [lastNameUpdated, setLastnameUpdated] = useState(user && user.last_name);
    const [phoneNumberUpdated, setPhoneNumberUpdated] = useState(user && user.phone);
    const [addressUpdated, setAddressUpdated] = useState(user && user.address);

    async function uploadToStorage(ref, file) {
        if (!file) {
            toast.error('No se ha detectado ningun archivo');
        } else {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 500,
                useWebWorker: true,
                convertSize: 500,
                convertTypes: ['image/png', 'image/webp', 'image/jpg'],
            };
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
        };
        axios
            .put(URL.users + `/${user.hex_code}`, updateData, { headers: { 'x-access-token': token } })
            .then((res) => props.updateUser())
            .catch((error) => console.log(error));
        if (newPhoto.current.files[0] !== undefined) {
            const newFile = newPhoto.current.files[0];
            uploadToStorage(storageRef, newFile);
        }
        props.changeEdit();
    }


    return (
        <div className="absolute z-10 flex min-h-screen h-full w-full items-center justify-center">
        <form
            onSubmit={updateContentEdited}
            className="h-[43rem] w-[35rem] rounded-md bg-white/90 px-[2rem] py-[2rem] shadow-lg dark:bg-black/90 500:h-[36rem]"
        >
            <div
                className="flex w-full cursor-pointer justify-end"
                onClick={props.changeEdit}
            >
                {Icons.close}
            </div>

            <h1 className="mb-8 text-center text-2xl font-semibold">
                Actualizar datos
            </h1>

            <div className="flex flex-col gap-y-3">
                <input type="file" className="flex w-full" ref={newPhoto} />

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
                            value={props.phoneNumberUpdated}
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
                            value={props.addressUpdated}
                            className="w-full rounded-md bg-indigo-700/30 py-2 px-4 focus:outline-none dark:text-white"
                            onChange={(event) =>
                                setAddressUpdated(event.target.value)
                            }
                        />
                    </div>
                </div>

            </div>
            <button className="buttons mt-8 w-full">Actualizar</button>
        </form>
    </div>
    );
}

export default ProfileModal;
