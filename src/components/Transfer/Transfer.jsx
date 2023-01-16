import React, {useState} from 'react';

const Transfer = () => {

    const [transactionData, setTransactionData] = useState({
        date: new Date().toLocaleDateString(),
        from : 0o00000, ///acá va el hex del user
        to : 0o00000,
        amount : 0,
        token : ""
    })



    return (
        <>
        <div className='mt-6 bg-alternative dark:bg-alternative/80 w-9/12 m-auto h-70 rounded-lg md:w-3/12'>
            <h2 className='text-lg font-bold p-5 text-center'>Enviá criptos a otro DevCoiner !</h2>

            <form action="" className='flex flex-col items-center content-center' >
                <div className="flex w-10/12">
                    <label htmlFor="token" className='flex flex-col items-center content-center'> Token:
                        <select name="token" id="" className='w-12/12 text-center text-black font-semibold rounded-md' onChange={(e)=>{setTransactionData({
                              date: transactionData.date,
                              from : transactionData.from,
                              to : transactionData.to,
                              amount : transactionData.amount,
                              token : e.target.value
                        })}}>
                            <option value="Juanbit">Juanbit</option>
                            <option value="Maxicoin">Maxicoin</option>
                            <option value="Terra">Terra</option>
                            <option value="Lucabit">Lucabit</option>
                            <option value="Gonzakoin">Gonzakoin</option>
                            <option value="Leotok">Leotok</option>
                            <option value="Lauken">Lauken</option>
                            <option value="Theth">Theth</option>
                        </select>
                    </label>
                    <label htmlFor="amount" className='flex flex-col items-center content-center'>Cantidad:
                        <input className='w-10/12 text-center text-black font-semibold rounded-md' type="number" name="amount" min={1} onChange={(e)=>{setTransactionData({
                              date: transactionData.date,
                              from : transactionData.from,
                              to : transactionData.to,
                              amount : e.target.value,
                              token : transactionData.token
                        })}}/>
                    </label>
                </div>
                <div className="flex flex-col w-10/12 ">
                <label htmlFor="to" className='flex flex-col items-center content-center mt-2 md:mt-2 w-12/12'>Destino :
                    <input className='w-4/12 text-black text-center font-semibold rounded-md' type="text" name="to" min={0} maxLength={6} onChange={(e)=>{setTransactionData({
                              date: transactionData.date,
                              from : transactionData.from,
                              to : parseInt(e.target.value),
                              amount : transactionData.amount,
                              token : transactionData.token
                        })}}/>
                </label>
                <button className='w-fit mx-auto px-6 py-1 my-4 text-white bg-secondary font-bold rounded-lg hover:cursor-pointer md:mt-7'>ENVIA</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default Transfer;
