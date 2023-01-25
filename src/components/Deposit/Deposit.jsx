import React, {useContext} from 'react';
import { walletContext } from "../../context/walletContext"
import { toast } from 'react-toastify';
import * as URL from '../../utils/URL'
import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';

const Deposit = (props) => {


    const wallet = useContext(walletContext)
    const user = useContext(userContext)
    const token = useContext(tokenContext)

    const depositFiatMoney = (obj) => {
        fetch(URL.wallet+'/'+user.hex_code, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
                'x-access-token' : token
            },
            body: JSON.stringify(obj)
        })
        .then( res => {props.update(); toast.success('Operación exitosa')})
        .catch(err => toast.error(err))
    }

    const handleDeposit = (e) => {
        e.preventDefault;
        let valueToDeposit = prompt('¿Cuántos USD quieres depositar?')
        if(valueToDeposit){
            let depositData = {
                'balance' : parseFloat(valueToDeposit)
            }
            depositFiatMoney(depositData)
        }else{
            toast.error('Operación cancelada')
        }
      
    }

    

    return (
        <div className="grid bg-secondary/50 grid-cols-2 w-full mt-6 h-18 rounded-lg items-center text-center font-semibold p-2 lg:col-start-4">
            <span className='m-auto text-center'>
            Tu saldo actual es de ${wallet.balance}
            </span>
            <button className='bg-alternative w-fit m-auto p-2 rounded-lg hover:bg-alternative/80' onClick={handleDeposit}>DEPOSITAR</button>
        </div>
    );
}

export default Deposit;
