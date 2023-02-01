import React, { useEffect, useState, useContext } from 'react';
import { coinsContext } from '../../context';
import * as Icons from '../../utils/icons'
import { AppWrap } from '../../wrapper';

function ConvertPage() {
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState();
  const [moneda2, setMoneda2] = useState();
  const [resultSymbol, setResultSymbol] = useState('')
  const [monto, setMonto] = useState(0);
  const [result, setResult] = useState(0);

  const {prices} = useContext(coinsContext)

  useEffect(() => {
    setMonto('');
    setResult('');
  }, [moneda1, moneda2]);


  const handleConvert = () => {
    let convertionResult = (moneda1 * monto / moneda2).toFixed(6)
    setResult(convertionResult)
  };

  const limpiarCampos = () => {
    setMonto('');
    setResult('');
    setMoneda1('');
    setMoneda2('');
  }

  const invertirCoins = () => {
    setMoneda1(moneda2);
    setMoneda2(moneda1);
    setResultSymbol()
  }

  useEffect(()=>{
    if(moneda2){
      let outputToken = prices.find((coin) => coin.current_price === parseFloat(moneda2))
      setResultSymbol(outputToken.symbol)
    }
  }, [moneda2])
  
  return (
    <div className="background">
      <h1 className="mb-8 text-start text-2xl font-semibold">
            Conversor
      </h1>       
      <div className="mt-12 relative flex justify-center">
          <div className=" w-full rounded-md bg-gradient-to-b from-indigo-400 via-zinc-500 to-zinc-900 p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl h-fit ">          
          <div className="selects-container mb-2 block text-xl font-medium text-gray-900 lg:flex lg:my-6 lg:items-center">
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600  dark:bg-neutral-800/80 dark:text-white lg:max-w-xl lg:whitespace-normal lg:text-center lg:h-fit"
              value={moneda1}
              name="moneda-1"
              id="moneda-1"
              onChange={(e) => setMoneda1(e.target.value)}
            >
              <option value="">Seleccioná tu moneda</option>
              {prices.map((moneda, idx) => (
                <option key={idx} className="uppercase" value={moneda.current_price}>{moneda.symbol}
                </option>
              ))}
            </select>

            <div className="w-full my-[1rem] text-center">
              <button onClick={invertirCoins} className="buttons px-8">
                {Icons.arrows}                
              </button>
            </div>

            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600  dark:bg-neutral-800/80 dark:text-white lg:max-w-xl lg:whitespace-normal lg:text-center lg:h-fit"
              value={moneda2}
              name="moneda-2"
              id="moneda-2"
              onChange={(e) => setMoneda2(e.target.value)}>
              <option value="">Seleccioná a qué moneda convertir</option>
              {prices.map((moneda, idx) => (
                <option key={idx} value={moneda.current_price}>{moneda.symbol}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <div className="gap-x-4">
            <p className="text-1xl font-semibold w-full text-center whitespace-nowrap my-2">
              Coloque valor a convertir
            </p>
            {Icons.flecha}
            <input
                className="border-black-300 bg-black-50 dark:bg-neutral-800/80 dark:text-white text-center w-full py-2 border-b-2 focus:outline-none"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Monto"
            />
            </div>
            <div className="flex flex-col">
            {/* <span className="text-1xl font-semibold text-center">
              =              
            </span> */}
            <span className='h-8 m-2 uppercase'>{result} {result != 0 && resultSymbol }</span>
            </div>
          </div>

          <div className="text-center flex justify-center gap-4">
            {moneda1 && moneda2 ?
            <button
            onClick={handleConvert}
            className="buttons px-8 text-center"
          >
            Convertir
          </button> :
            <button
              onClick={handleConvert}
              className="px-8 py-2 rounded-md text-center bg-slate-400"
              disabled
            >
              Convertir
            </button>
            }
          <button
              onClick={limpiarCampos}
              className="buttons px-8 text-center"
          >
            Limpiar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppWrap(ConvertPage);
