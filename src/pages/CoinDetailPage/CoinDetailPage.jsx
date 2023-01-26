import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppWrap } from '../../wrapper';
import axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const CoinDetailPage = () => {
    const [coin, setCoin] = useState([]);
    const [dataCoin, setDataCoin] = useState([]);
    const [dataChartCoin, setDataChartCoin] = useState([]);

    const params = useParams();
    const element = params.id;

    // GET para detalles de la criptomoneda (nombre, imagen, ...)
    async function CoinAPI() {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${element}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        setCoin(res.data[0]);
    }

    // GET Market Chart (prices, market_cap, total_volume)
    async function DataCoinAPI() {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${element}/market_chart?vs_currency=usd&days=7`
        );
        setDataCoin(res.data);

        const coinChartData = res.data.prices.map((value) => ({
            x: value[0],
            y: value[1].toFixed(2),
        }));
        setDataChartCoin(coinChartData);
    }

    // useEffect para iniciar las funciones GET
    useEffect(() => {
        CoinAPI();
        DataCoinAPI();
    }, [element]);

    const options = {
        responsive: true,
    };

    const data = {
        labels: dataChartCoin.map((value) => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: coin.name,
                data: dataChartCoin.map((value) => value.y),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: '#4F46E5',
            },
        ],
    };

    console.log(coin);

    return (
        <>
            <h1 className="flex w-full items-center justify-center gap-x-4 text-2xl font-bold 400:justify-start">
                <img src={coin.image} alt={coin.id} width={40} />
                {coin.name}
            </h1>
            <div className="mt-[2rem] w-full">
                <div className="flex flex-col justify-center lg:flex-row lg:justify-start lg:gap-8">
                    <div className="w-full lg:h-fit lg:w-[58%]">
                        <Line options={options} data={data}  />
                    </div>
                    <div className=" w-full  pt-6 lg:w-[38%] grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="text-gray-700/80 ">Ranking: </h4>
                                <span>{coin.market_cap_rank}</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="text-gray-700/80">Precio actual:</h4>
                                <span>${coin.current_price} USD</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="text-gray-700/80">Minimo en 24h:</h4>
                                <span>${coin.low_24h} USD</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="text-gray-700/80">Maximo en 24h:</h4>
                                <span>${coin.high_24h} USD</span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="whitespace-nowrap text-gray-700/80">
                                    Cambio en 24h:
                                </h4>
                                <span
                                    className={`
                                    ${
                                        coin.price_change_percentage_24h > 0
                                            ? 'text-green-500 dark:text-green-400'
                                            : 'text-red-500'
                                    }`}
                                >
                                    {coin.price_change_percentage_24h > 0 ? (
                                        <>+{coin.price_change_percentage_24h}</>
                                    ) : (
                                        <>{coin.price_change_percentage_24h}</>
                                    )}
                                    %
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                <h4 className="text-gray-700/80">Volumen total:</h4>
                                <span>{coin.total_volume}</span>
                            </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-4 h-auto w-full mb-6 lg:flex-row justify-center lg:mt-12">

                <div className="bg-secondary p-3  flex flex-col items-center rounded-md  text-white lg:w-3/6 lg:gap-3">
                    <input type="text" className='rounded-sm text-sm p-2 bg-cyan-900/70 text-white' placeholder='Cantidad...'/>
                    <div className='flex  lg:flex-row lg:gap-6 lg:items-center'>
                    <span>
                        Recibirás  {coin.symbol.toUpperCase()}
                    </span>
                    <button className='bg-green-500 py-2 px-4 rounded-md'>COMPRAR</button>
                    </div>
                </div>

                <div className="bg-secondary p-3 lg:gap-3 flex flex-col items-center rounded-md text-white
lg:w-3/6">
                    <input type="text" className='rounded-sm text-sm p-2  bg-cyan-900/70' placeholder='Cantidad...'/>
                    <div className="flex lg:flex-row lg:gap-6 lg:items-center">
                    <span>
                        Recibirás USD
                    </span>
                    <button className='bg-red-800  py-2 px-4 rounded-md'>VENDER</button>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AppWrap(CoinDetailPage);
