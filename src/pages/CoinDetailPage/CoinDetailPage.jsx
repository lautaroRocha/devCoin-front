import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { AppWrap } from '../../wrapper';
import axios from 'axios';
import{ CoinData} from '../../components';
import { BuyCrypto, SellCrypto } from '../../components';
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

const CoinDetailPage = (props) => {

    const [coin, setCoin] = useState([]);
    const [dataCoin, setDataCoin] = useState([]);
    const [dataChartCoin, setDataChartCoin] = useState([]);

    const params = useParams();
    const element = params.id;

    async function CoinAPI() {
        const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${element}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        setCoin(res.data[0]);
    }

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
                        <CoinData coin={coin}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 h-auto w-full mb-6 lg:flex-row justify-center lg:mt-12">
                   <BuyCrypto coin={coin} update={props.props.update}/>
                   <SellCrypto coin={coin} update={props.props.update}/>
                </div>
            </>
        );
   
};

export default AppWrap(CoinDetailPage);
