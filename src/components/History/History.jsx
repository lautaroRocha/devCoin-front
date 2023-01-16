import React, {useState} from 'react';


///estos dos despues se cambian por datoas reales de la API
const MOCK_TRANSACTION_SENT = [{transactionId: 456, date: "2/1/2023", from : "Lucas", to : "David", token : "lukether", amount : 10}, {transactionId: 454, date: "8/1/2023", from : "Lucas", to : "David", token : "lukether", amount : 10}, {transactionId: 452, date: "12/1/2023", from : "Lucas", to : "David", token : "lukether", amount : 10}]

const MOCK_TRANSACTION_RECEIVED = [{transactionId: 456, date: "2/1/2023", from : "Gonzalo", to : "Lucas", token : "juanbit", amount : 10}, {transactionId: 457, date: "3/1/2023", from : "Lautaro", to : "Lucas", token : "lauchatoken", amount :7}, {transactionId: 459, date: "5/1/2023", from : "Leo", to : "Lucas", token : "leoilo", amount : 8}]

const History = () => {

    const [transactionsByUser, setTransactionsByUser] = useState(MOCK_TRANSACTION_SENT)
    const [transactionsToUser, setTransactionsToUser] = useState(MOCK_TRANSACTION_RECEIVED)


    return (
        <div className='flex flex-col h-screen items-center  w-10/12 m-auto mt-5 lg:w-10/12 lg:mr-auto lg:ml-45 lg:flex-row lg:items-start lg:mt-12'>
        <table>
            <tr>
                <th>Recibidas</th>
            </tr>
        <tbody>
            {transactionsToUser.map( (trans) => {
                return(
                    <tr class="odd:bg-secondary/20 even:bg-secondary/50 w-auto grid grid-cols-4 place-items-center	text-center ml-4">
                    <td>{trans.from}</td>
                    <td>{trans.token}</td>
                    <td>{trans.amount}</td>
                    <td>{trans.date}</td>
                </tr>
                )
            })}
        </tbody>
        </table>
        
        <table className='mt-5 lg:mt-0'>
        <tbody>
            <tr>
            <th>Enviadas</th>
            </tr>
            {transactionsByUser.map( (trans) => {
                return(
                    <tr class="odd:bg-secondary/20 even:bg-secondary/50 w-auto grid grid-cols-4 text-center ml-4 place-items-center	 ">
                    <td>{trans.from}</td>
                    <td>{trans.token}</td>
                    <td>{trans.amount}</td>
                    <td>{trans.date}</td>
                </tr>
                )
            })}
        </tbody>
        </table>
        </div>
    );
}

export default History;
