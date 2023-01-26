import React from 'react';
import { Link } from 'react-router-dom';

const CoinRankingRow = (props) => {
    return (
        <tr className="border-b bg-white text-black/90 dark:border-gray-700 dark:bg-neutral-800/20 dark:text-white">
            <td>
                <Link to={`/coins/${props.id}`} className="flex items-center gap-3 py-4 pl-6">
                    <img className="min-w-[25px] max-w-[30px]" src={props.image} alt={props.name} />
                    <span className="font-bold uppercase  dark:text-white">{props.symbol}</span>
                    <span className="text-[#707a8a] dark:text-[848e9c]">{props.name}</span>
                </Link>
            </td>
            <td className="py-4 px-6">${props.price}</td>
            <td
                className={
                    props.priceChange > 0
                        ? 'py-3 px-6 text-green-500 dark:text-green-400'
                        : 'py-3 px-6 text-red-500'
                }
            >
                {props.priceChange > 0 ? <>+{props.priceChange}</> : <>{props.priceChange}</>}%
            </td>
            <td className="py-4 px-6">{props.volume24h}M</td>
        </tr>
    );
};

export default CoinRankingRow;
