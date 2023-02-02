import React, { useState, useEffect, useContext } from 'react';
import { sessionContext, coinsContext } from '../../context';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';

const SellCrypto = ({ coin, update }) => {
    const { user } = useContext(sessionContext);
    const { coins } = useContext(coinsContext);
    const thereIsCoin = coins && coins.find((token) => token.symbol == coin.symbol);
    const [convertAmount, setConvertAmount] = useState(0);
    const [convertionResult, setConvertionResult] = useState(0);

    useEffect(() => {
        if (convertAmount !== 0) {
            let result = convertAmount * coin.current_price;
            setConvertionResult(result.toFixed(3));
        } else {
            setConvertionResult(0);
        }
    }, [convertAmount]);

    const handleInput = (e) => {
        if (e.target.value !== '') {
            const cryptoAmount = parseFloat(e.target.value);
            setConvertAmount(cryptoAmount);
        } else {
            setConvertAmount(0);
        }
    };

    const purchaseData = {
        symbol: coin.symbol,
        amount: String(convertAmount),
        hexacode: user && user.hex_code,
        total: String(convertionResult),
    };

    const sellCrypto = (e, obj) => {
        e.preventDefault();
        if (convertAmount > 0) {
            if (convertAmount <= thereIsCoin.amount) {
                fetch(URL.coins, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.validate) {
                            e.target.reset();
                            setConvertionResult(0);
                            toast.success('¡Venta exitosa!');
                            update();
                        } else {
                            e.target.reset();
                            setConvertionResult(0);
                            toast.error(data.message);
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                toast.error('No tienes suficiente saldo');
                e.target.reset();
                setConvertionResult(0);
            }
        } else {
            toast.error('Ingresá un monto válido');
            setConvertionResult(0);
            e.target.reset();
        }
    };

    return (
        <form
            className="flex w-full max-w-[400px] flex-col items-center gap-y-4 rounded-md bg-neutral-800 p-3 py-6 px-6 text-white dark:bg-neutral-800/80 lg:gap-3"
            onSubmit={(e) => {
                sellCrypto(e, purchaseData);
            }}
        >
            <input
                type="number"
                step="0.01"
                className="w-full rounded-md bg-black/90 py-2 px-4 text-white focus:outline-none"
                placeholder="Cantidad..."
                onChange={handleInput}
            />

            <span>Recibirás {convertionResult} USD</span>
            <button className="w-full max-w-[150px] rounded-md border-2 border-red-400 py-2 px-4 text-red-400 transition-colors hover:bg-red-400 hover:text-black">
                VENDER
            </button>
        </form>
    );
};

export default SellCrypto;
