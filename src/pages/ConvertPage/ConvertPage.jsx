import React, { useEffect, useState, useContext } from 'react';
import { coinsContext } from '../../context';
import * as Icons from '../../utils/icons';
import { AppWrap } from '../../wrapper';

function ConvertPage() {
    const [monedas, setMonedas] = useState([]);
    const [moneda1, setMoneda1] = useState();
    const [moneda2, setMoneda2] = useState();
    const [resultSymbol, setResultSymbol] = useState('');
    const [monto, setMonto] = useState(0);
    const [result, setResult] = useState(0);

    const { prices } = useContext(coinsContext);

    useEffect(() => {
        setMonto('');
        setResult('');
    }, [moneda1, moneda2]);

    const handleConvert = () => {
        let convertionResult = ((moneda1 * monto) / moneda2).toFixed(6);
        setResult(convertionResult);
    };

    const limpiarCampos = () => {
        setMonto('');
        setResult('');
        setMoneda1('');
        setMoneda2('');
    };

    const invertirCoins = () => {
        setMoneda1(moneda2);
        setMoneda2(moneda1);
        setResultSymbol();
    };

    useEffect(() => {
        if (moneda2) {
            let outputToken = prices.find((coin) => coin.current_price === parseFloat(moneda2));
            setResultSymbol(outputToken.symbol);
        }
    }, [moneda2]);

    return (
        <>
            <h1 className="mb-8 text-start text-2xl font-semibold">Conversor</h1>
            <div className="relative mt-12 flex h-[70vh] w-full justify-center">
                <div className="m-auto h-fit w-full rounded-md bg-gradient-to-b from-indigo-600 via-zinc-900 to-zinc-900 px-4 py-6 shadow-xl dark:border dark:border-slate-600/80 dark:bg-neutral-800/80 dark:text-white md:px-8 lg:max-w-xl">
                    <div className="selects-container mb-2 block text-xl font-medium text-gray-900 lg:my-6 lg:flex lg:items-center">
                        <select
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600  dark:bg-neutral-800/80 dark:text-white lg:h-fit lg:max-w-xl lg:whitespace-normal lg:text-center"
                            value={moneda1}
                            name="moneda-1"
                            id="moneda-1"
                            onChange={(e) => setMoneda1(e.target.value)}
                        >
                            <option value="">Seleccioná tu moneda</option>
                            {prices.map((moneda, idx) => (
                                <option
                                    key={idx}
                                    className="uppercase"
                                    value={moneda.current_price}
                                >
                                    {moneda.symbol}
                                </option>
                            ))}
                        </select>

                        <div className="my-[1rem] w-full text-center">
                            <button onClick={invertirCoins} className="buttons px-8">
                                {Icons.arrows}
                            </button>
                        </div>

                        <select
                            className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-600 dark:bg-neutral-800/80 dark:text-white lg:h-fit lg:max-w-xl lg:whitespace-normal lg:text-center"
                            value={moneda2}
                            name="moneda-2"
                            id="moneda-2"
                            onChange={(e) => setMoneda2(e.target.value)}
                        >
                            <option value="">Seleccioná a qué moneda convertir</option>
                            {prices.map((moneda, idx) => (
                                <option key={idx} value={moneda.current_price}>
                                    {moneda.symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex flex-col gap-y-2 text-white">
                            <p className="text-1xl mb-2 w-full whitespace-nowrap text-center font-semibold">
                                Coloque valor a convertir
                            </p>
                            {Icons.flecha}
                            <input
                                className="border-black-300 bg-black-50 mt-2 w-full rounded-md border-b-2 bg-gray-200 py-2 text-center text-black focus:outline-none dark:bg-neutral-800/80 dark:text-white"
                                type="number"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                placeholder="Monto"
                            />
                        </div>

                        <span className="m-2 h-8 uppercase text-white">
                            {result} {result != 0 && resultSymbol}
                        </span>
                    </div>

                    <div className="mb-8 flex flex-col justify-center gap-4 text-center md:flex-row">
                        {moneda1 && moneda2 ? (
                            <button onClick={handleConvert} className="buttons px-8 text-center">
                                Convertir
                            </button>
                        ) : (
                            <button
                                onClick={handleConvert}
                                className="rounded-md bg-slate-400 px-8 py-2 text-center"
                                disabled
                            >
                                Convertir
                            </button>
                        )}
                        <button onClick={limpiarCampos} className="buttons px-8 text-center">
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppWrap(ConvertPage);
