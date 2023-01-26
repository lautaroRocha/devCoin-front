import React, { useState, useContext } from 'react';
import { userContext, tokenContext, coinsContext, walletContext } from '../../context';
import * as URL from '../../utils/URL'

const Transfer = () => {

    const token = useContext(tokenContext);
    const user = useContext(userContext);
    const coins = useContext(coinsContext);
    const wallet = useContext(walletContext);

    const [transactionData, setTransactionData] = useState({
        from: user.hex_code, 
        to: 0o00000,
        amount: 0,
        token: '',
    });

    const sendTransaction = (obj) => {
        fetch(URL.transaction), {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'x-access-token' : token
            },
            body : JSON.stringify(obj)
        }
        .then( res => {
            console.log(res)
        })
        .catch(error=>console.log(error))
    }
    
    return (
        <>
            <div className="m-auto h-[23rem] w-full rounded-md bg-gray-200/90 text-black shadow-md dark:bg-neutral-800/80 dark:text-white lg:col-start-4">
                <h2 className="p-5 text-center text-lg font-bold">Transferir Criptos</h2>
                <form className="flex h-[17.8rem] w-full flex-col justify-between px-4">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="token">Token</label>
                            <select
                                name="token"
                                id="token"
                                className="w-full rounded-md py-2 px-4 text-black focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(e) => {
                                    setTransactionData({
                                        from: transactionData.from,
                                        to: transactionData.to,
                                        amount: transactionData.amount,
                                        token: e.target.value,
                                    });
                                }}
                            >
                                <option value="">Seleciona una moneda...</option>
                                {/* <option value="Maxicoin">Maxicoin</option>
                                <option value="Terra">Terra</option> */}
                                {coins.map( (coin, idx) => {
                                    return(<option value={coin.symbol} key={idx}>{coin.name.toUpperCase()}</option>)
                                })

                                }
                            </select>
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="quantity">Cantidad</label>
                            <input
                                id="quantity"
                                type="number"
                                placeholder="Ingresa la cantidad"
                                className="w-full rounded-md py-2 px-4 text-black focus:outline-none dark:bg-black/90 dark:text-white"
                                onChange={(e) => {
                                    setTransactionData({
                                        from: transactionData.from,
                                        to: transactionData.to,
                                        amount: e.target.value,
                                        token: transactionData.token,
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
                                        from: transactionData.from,
                                        to: parseInt(e.target.value),
                                        amount: transactionData.amount,
                                        token: transactionData.token,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <button className="buttons w-full">Enviar</button>
                </form>
            </div>
        </>
    );
};

export default Transfer;
