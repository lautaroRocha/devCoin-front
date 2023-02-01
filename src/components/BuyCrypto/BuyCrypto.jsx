import React, {useState, useEffect, useContext} from 'react';
import { sessionContext } from '../../context';
import * as URL from '../../utils/URL'
import { toast } from 'react-toastify'

const BuyCrypto = ( {coin, update} ) => {

    const {user} = useContext(sessionContext)
    const [buyingMoney, setBuyingMoney] = useState(0)
    const [convertionResult, setConvertionResult] = useState(0)

    useEffect(() => {
        if(buyingMoney !== 0){
            let result = (buyingMoney / coin.current_price)
            setConvertionResult(result.toFixed(3))
        }else{
            setConvertionResult(0)
        }
    }, [buyingMoney]);

    const handleInput = (e) =>{
        if(e.target.value !== ""){
            const moneyAmount = parseFloat(e.target.value)
            setBuyingMoney(moneyAmount)
        }else{
            setBuyingMoney(0)
        }
       
    }

    const purchaseData = {
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        amount: String(convertionResult),
        hexacode: user && user.hex_code,
        total: String(buyingMoney)
    }

    const buyCrypto = (e, obj) => {
        e.preventDefault()
        if(buyingMoney > 0){
            fetch(URL.coins, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(obj)
            })
            .then( res => res.json())
            .then(data => {
                if(data.data){
                    e.target.reset()
                    setConvertionResult(0)
                    toast.success('¡Compra exitosa!')
                    update()
                }else{
                    e.target.reset()
                    setConvertionResult(0)
                    toast.error(data.message)
                }
               
                })
            .catch(err => toast.error(err))
        }else{
            toast.error('Ingresá un monto válido')
            setConvertionResult(0)
            e.target.reset()
        }
        
    }    
    
    return (
        <form className="bg-gradient-to-b from-indigo-600 via-zinc-900 to-zinc-900 p-3 flex flex-col items-center rounded-md  text-white lg:w-3/6 lg:gap-3" onSubmit={(e)=>{buyCrypto(e, purchaseData)}}>
            <input type='number' step="0.01" className='rounded-sm text-sm p-2 bg-cyan-900/70 text-white lg:text-lg' placeholder='Cantidad...' onChange={handleInput}/>
                <div className='flex flex-col items-center lg:flex-row lg:gap-6 lg:items-center text-center lg:text-lg'>
                    <span>
                        Recibirás {convertionResult} {coin.symbol}
                    </span>
                    <button className='bg-green-500 py-2 px-4 rounded-md' >COMPRAR</button>
                </div>
        </form>
    );
}

export default BuyCrypto;
