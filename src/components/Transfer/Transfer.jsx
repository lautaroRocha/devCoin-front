import React, { useState, useContext } from 'react';
import { sessionContext, coinsContext } from '../../context';
import * as URL from '../../utils/URL';
import { toast } from 'react-toastify';

const Transfer = (props) => {
    const { token, user } = useContext(sessionContext);
    const { coins } = useContext(coinsContext);

    const [transactionData, setTransactionData] = useState({
        sender_hexcode: user.hex_code,
        receiver_hexcode: "",
        amount: 0,
        symbol: '',
    });

    const sendTransaction = (obj) => {
        if (transactionData.amount <= 0 || transactionData.receiver_hexcode == "") {
            toast.error('No es un monto válido');
        }else if(transactionData.receiver_hexcode == transactionData.sender_hexcode){
            toast.error('No puedes transferirte a ti mismo')
        }else {
            fetch(URL.transaction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
                body: JSON.stringify(obj),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        let error = Array.from(data.message.split(','));
                        error.forEach((err) => toast.error(err));
                    } else {
                        toast.success('Transferencia realizada');
                        props.socket.emit('transfer', {
                            sender: user.hex_code,
                            receiver: transactionData.receiver_hexcode,
                        });
                        props.update();
                        setTransactionData({
                            sender_hexcode: user.hex_code,
                            receiver_hexcode: "",
                            amount: 0,
                            symbol: ''}
                        )
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    const handleTransaction = (e) => {
        e.preventDefault();
        e.target.reset();
        sendTransaction(transactionData);
    };

    return (
        <>
            <div className="h-fit w-full rounded-md bg-gray-200/90 pb-6 text-black shadow-md dark:bg-neutral-800/80 dark:text-white lg:col-start-4 lg:mb-auto">
                <h2 className="p-5 text-center text-lg font-bold">Transferir Criptos</h2>
                <form
                    className="flex h-[17.8rem] w-full flex-col justify-between px-4"
                    onSubmit={handleTransaction}
                >
                    <div className="flex flex-col gap-y-2">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="token">Token</label>
                            <select
                                name="token"
                                id="token"
                                className="w-full rounded-md py-2 px-4 text-black focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(e) => {
                                    setTransactionData({
                                        sender_hexcode: transactionData.sender_hexcode,
                                        receiver_hexcode: transactionData.receiver_hexcode,
                                        amount: transactionData.amount,
                                        symbol: e.target.value,
                                    });
                                }}
                            >
                                <option value="">Seleciona una moneda...</option>
                                {coins.map((coin, idx) => {
                                    return (
                                        <option value={coin.symbol} key={idx}>
                                            {coin.name.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="quantity">Cantidad</label>
                            <input
                                id="quantity"
                                type="number"
                                step="0.01"
                                placeholder="Ingresa la cantidad"
                                className="w-full rounded-md py-2 px-4 text-black focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(e) => {
                                    setTransactionData({
                                        sender_hexcode: transactionData.sender_hexcode,
                                        receiver_hexcode: transactionData.receiver_hexcode,
                                        amount: e.target.value,
                                        symbol: transactionData.symbol,
                                    });
                                }}
                            />
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="destination">Destino</label>
                            <input
                                id="destination"
                                type="text"
                                name="to"
                                min={0}
                                maxLength={6}
                                placeholder="Codigo de destino"
                                className="w-full rounded-md py-2 px-4 text-black focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(e) => {
                                    setTransactionData({
                                        sender_hexcode: transactionData.sender_hexcode,
                                        receiver_hexcode: e.target.value,
                                        amount: transactionData.amount,
                                        symbol: transactionData.symbol,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    {!transactionData.symbol ||
                    !transactionData.receiver_hexcode ||
                    !transactionData.amount ? (
                        <button
                            className="w-full rounded-md bg-slate-400 px-4 py-2 font-bold text-white"
                            disabled
                        >
                            Enviar
                        </button>
                    ) : (
                        <button className="buttons w-full">Enviar</button>
                    )}
                </form>
            </div>
        </>
    );
};

export default Transfer;
