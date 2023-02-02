import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import * as URL from '../../utils/URL';
import { sessionContext, coinsContext } from '../../context';

const Deposit = (props) => {
    const { user, token } = useContext(sessionContext);
    const { wallet } = useContext(coinsContext);

    const [valueToDeposit, setValueToDeposit] = useState('');

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
                setValueToDeposit(null)
            })
            .catch((err) => toast.error(err));
    };

    const handleDeposit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (valueToDeposit > 0) {
            let depositData = {
                balance: valueToDeposit,
            };
            depositFiatMoney(depositData);
        } else {
            toast.error('Operación cancelada');
        }
    };

    return (
        <div className="max-lg:w-full lg:col-start-4 lg:grid">
            <form
                className="flex h-fit w-full flex-col items-center rounded-md bg-secondary px-6 pb-6 text-center text-white shadow-md 600:flex-row 600:py-6 lg:gap-x-4"
                onSubmit={handleDeposit}
            >
                <h4 className="flex w-full flex-col items-center gap-y-2 text-center font-semibold max-600:justify-center max-600:gap-x-4 max-600:py-6 500:flex-row 600:flex-col">
                    Balance actual: <span className="text-2xl">${wallet.balance} USD </span>
                </h4>
                <div className="flex w-full flex-col gap-y-4">
                    <input
                        type="number"
                        min="1"
                        placeholder="¿Cuanto sumas?"
                        className="w-full rounded-md py-2 px-4 text-black focus:outline-none"
                        onChange={(e) => setValueToDeposit(parseFloat(e.target.value))}
                    />
                    {!valueToDeposit ? (
                        <button
                            className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md bg-slate-400 p-2 px-0 font-semibold transition-colors"
                            disabled
                        >
                            Depositar
                        </button>
                    ) : (
                        <button className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md bg-green-500 p-2 px-0 font-semibold transition-colors hover:bg-green-500/80">
                            Depositar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Deposit;
