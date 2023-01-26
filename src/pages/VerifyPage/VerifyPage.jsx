import React, {useEffect} from 'react';
import { AppWrap } from '../../wrapper';
import * as URL from '../../utils/URL'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const VerifyPage = () => {

    const email = useParams()
    const navigate = useNavigate()


    function verifyUser(){
        fetch(URL.users+'/'+email.email+'.com',{
            method : "PATCH"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                toast.error('Hubo un problema, intentá de nuevo más tarde')
            }else{
                toast.success('¡Verificado!')
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
