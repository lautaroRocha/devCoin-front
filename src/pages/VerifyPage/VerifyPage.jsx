import React, {useEffect} from 'react';
import { AppWrap } from '../../wrapper';
import * as URL from '../../utils/URL'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { AES, enc } from 'crypto-js';

const VerifyPage = () => {

    const cipheredMail = useParams()
    const navigate = useNavigate()

    const decryptEmail = (crypt) => {
        let reb64 = enc.Hex.parse(crypt);
        let bytes = reb64.toString(enc.Base64);
        let decrypt = AES.decrypt(bytes, 'secret');
        let plain = decrypt.toString(enc.Utf8);

        return plain
    }


    function verifyUser(){
        const decipheredMail = decryptEmail(cipheredMail.email)+'.com'
        console.log(decipheredMail)
        fetch(URL.users+'/'+decipheredMail,{
            method : "PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                toast.error('Hubo un problema, intentá de nuevo más tarde')
            }else{
                toast.success('¡Verificado!')
                toast.info('Te regalamos USD2000 para que empieces a operar')
                navigate('/login')
            }
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        verifyUser()
    }, []);


    return (
        <div className='flex flex-col text-center mt-[25vh] font-sans font-extrabold text-secondary text-4xl'>
            Verificando...
            <span className='font-semibold text-black text-2xl mt-6'>Serás redigirido pronto...</span>
        </div>
    );
}

export default AppWrap(VerifyPage);
