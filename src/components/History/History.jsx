import React, { useContext, useState, useEffect } from 'react';
import { coinsContext } from '../../context';


const History = () => {

    const coinsData = useContext(coinsContext)
    const transactions = coinsData && coinsData.transactions
    const [sentTransactions, setSentTransactions] = useState([])
    const [receivedTransactions, setReceivedTransactions] = useState([])

    useEffect(()=>{
        const emitted = transactions.emisor.data.slice(1).slice(-5)
        const received = transactions.receptor.data.slice(1).slice(-5)
        setSentTransactions(emitted)
        setReceivedTransactions(received)
    }, [transactions])


    return (
        <div className="mt-8 flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-center lg:gap-16">
            <table>
                <thead>
                    <tr>
                        <th>Recibidas</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedTransactions.map((trans, idx) => {
                        return (
                            <tr
                                className="grid w-full grid-cols-4 place-items-center text-center odd:bg-secondary/20 text-sm	even:bg-secondary/50 lg:m-0 whitespace-nowrap"
                                key={idx}
                            >
                                <td>#{trans.sender_hexcode}</td>
                                <td>{trans.coinId}</td>
                                <td>{trans.amount}</td>
                                <td className='p-3'>{trans.transaction_date.slice(0, 10)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table className="mt-5 lg:mt-0">
                <tbody>
                    <tr>
                        <th>Enviadas</th>
                    </tr>
                    {sentTransactions.map((trans, idx) => {
                        return (
                            <tr
                                className="grid w-full grid-cols-4 place-items-center text-center odd:bg-secondary/20 even:bg-secondary/50 lg:m-0 whitespace-nowrap text-sm"
                                key={idx}
                            >
                                <td>#{trans.receiver_hexcode}</td>
                                <td>{trans.coinId}</td>
                                <td>{trans.amount}</td>
                                <td className='p-3'>{trans.transaction_date.slice(0, 10)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default History;
