import React, { useState, useEffect, useContext } from 'react';
import { sessionContext } from '../../context';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';

const BuyCrypto = ({ coin, update }) => {
    const { user } = useContext(sessionContext);
    const [buyingMoney, setBuyingMoney] = useState(0);
    const [convertionResult, setConvertionResult] = useState(0);

    useEffect(() => {
        if (buyingMoney !== 0) {
            let result = buyingMoney / coin.current_price;
            setConvertionResult(result.toFixed(3));
        } else {
            setConvertionResult(0);
        }
    }, [buyingMoney]);

    const handleInput = (e) => {
        if (e.target.value !== '') {
            const moneyAmount = parseFloat(e.target.value);
            setBuyingMoney(moneyAmount);
        } else {
            setBuyingMoney(0);
        }
    };

    const purchaseData = {
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        amount: String(convertionResult),
        hexacode: user && user.hex_code,
        total: String(buyingMoney),
    };

    const buyCrypto = (e, obj) => {
        e.preventDefault();
        if (buyingMoney > 0) {
            fetch(URL.coins, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.data) {
                        e.target.reset();
                        setConvertionResult(0);
                        toast.success('¡Compra exitosa!');
                        update();
                    } else {
                        e.target.reset();
                        setConvertionResult(0);
                        toast.error(data.message);
                    }
                })
                .catch((err) => toast.error(err));
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
                buyCrypto(e, purchaseData);
            }}
        >
            <input
                type="number"
                step="0.01"
                className="w-full rounded-md bg-black/90 py-2 px-4 text-white focus:outline-none"
                placeholder="Cantidad..."
                onChange={handleInput}
            />

            <span className="">
                Recibirás {convertionResult} <span className="uppercase">{coin.symbol}</span>
            </span>

            <button className="w-full max-w-[150px] rounded-md border-2 border-green-400 py-2 px-4 text-green-400 transition-colors hover:bg-green-400 hover:text-black">
                COMPRAR
            </button>
        </form>
    );
};

export default BuyCrypto;
