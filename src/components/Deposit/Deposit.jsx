import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import * as URL from '../../utils/URL';
import { userContext, tokenContext, walletContext } from '../../context';

const Deposit = (props) => {
    const wallet = useContext(walletContext);
    const user = useContext(userContext);
    const token = useContext(tokenContext);

    const depositFiatMoney = (obj) => {
        fetch(URL.wallet + '/' + user.hex_code, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify(obj),
        })
            .then((res) => {
                props.update();
                toast.success('Operación exitosa');
            })
            .catch((err) => toast.error(err));
    };

    const handleDeposit = (e) => {
        e.preventDefault;
        let valueToDeposit = prompt('¿Cuántos USD quieres depositar?');
        if (valueToDeposit) {
            let depositData = {
                balance: parseFloat(valueToDeposit),
            };
            depositFiatMoney(depositData);
        } else {
            toast.error('Operación cancelada');
        }
    };

    return (
        <div className="h-18 mt-6 grid w-full grid-cols-2 items-center rounded-lg bg-secondary/50 p-2 text-center font-semibold lg:col-start-4">
            <span className="m-auto text-center">Tu saldo actual es de ${wallet.balance}</span>
            <button
                className="m-auto w-fit rounded-lg bg-alternative p-2 hover:bg-alternative/80"
                onClick={handleDeposit}
            >
                DEPOSITAR
            </button>
        </div>
    );
};

export default Deposit;
