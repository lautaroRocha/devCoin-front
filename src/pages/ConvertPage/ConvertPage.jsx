import React, { useEffect, useState } from 'react';
import * as Icons from '../../utils/icons'
import { AppWrap } from '../../wrapper';

function ConvertPage() {
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState();
  const [moneda2, setMoneda2] = useState();
  const [monto, setMonto] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const host =
      'api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    fetch(`https://${host}/currencies`)
      .then((resp) => resp.json())
      .then((data) => {
        setMonedas(data);
      });
  }, []);

  useEffect(() => {
    setMonto('');
    setResult('');
  }, [moneda1, moneda2]);

  const handleConvert = () => {
    setResult((moneda1 / moneda2).toFixed(6));
  };

  return (
    <div className="background">
      <h1 className="text-center text-3xl font-semibold">
        Calculadora convertidora de criptomonedas
      </h1>
      <div className="relative flex min-h-screen justify-center overflow-hidden">
        <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl dark:bg-neutral-800/80 dark:text-white lg:max-w-xl ">
          <div className="selects-container mb-2 block text-xl font-medium text-gray-900">
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600  dark:bg-neutral-800/80 dark:text-white lg:max-w-xl"
              value={moneda1}
              name="moneda-1"
              id="moneda-1"
              onChange={(e) => setMoneda1(e.target.value)}
            >
              {monedas.map((moneda) => (
                <option value={moneda.current_price}>{moneda.symbol}</option>
              ))}
            </select>
            <div className="w-full my-[1rem] text-center">
              <button className="buttons px-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600  dark:bg-neutral-800/80 dark:text-white lg:max-w-xl"
              value={moneda2}
              name="moneda-2"
              id="moneda-2"
              onChange={(e) => setMoneda2(e.target.value)}
            >
              {monedas.map((moneda) => (
                <option value={moneda.current_price}>{moneda.symbol}</option>
              ))}
            </select>
          </div>
          <div className="inputs-container">
            <div className="flex gap-x-4">
            <p className="text-1xl font-semibold">
              Coloque valor a convertir
            </p>
            <span>{Icons.flecha}</span>
            <input
                className="border-black-300 bg-black-50 dark:bg-neutral-800/80 dark:text-white"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Monto"
            />

            </div>
            <div className="flex">
            <span className="text-1xl font-semibold">
              =              
            </span>
            <span>{result}</span>
            </div>
          </div>
          <br></br>
          <div className="text-center">
            <button
              onClick={handleConvert}
              className="buttons px-8 text-center"
            >
              Convertir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppWrap(ConvertPage);
