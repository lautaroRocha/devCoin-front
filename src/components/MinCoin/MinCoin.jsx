import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { coinsContext } from '../../context';

const MinCoin = ({ coin, index }) => {
    const { prices } = useContext(coinsContext);
    let coinCurrentPrice = prices.find((prices) => prices.name === coin.name);

    return (
        <tr
            key={index}
            className="border-b bg-white text-black/90 dark:border-gray-700 dark:bg-neutral-800/20 dark:text-white"
        >
            <td className="flex items-center gap-3 py-4 pl-6">
                <Link to={`/coins/${coin.id}`} className="flex items-center gap-3 py-4 pl-6">
                    <img className="min-w-[25px] max-w-[30px]" src={coin.image} alt={coin.name} />
                    <span className="font-bold uppercase  dark:text-white">{coin.symbol}</span>
                    <span className="text-[#707a8a] dark:text-[848e9c]">{coin.name}</span>
                </Link>
            </td>
            <td>
                {parseFloat(coin.amount).toFixed(4)} {coin.symbol.toUpperCase()}
            </td>
            <td>${parseFloat(coin.amount) * coinCurrentPrice.current_price} USD</td>
            <td className="flex gap-x-4 hover:cursor-pointer">
                <Link to={`/coins/${coin.id}`} className="text-yellow-500/90">
                    Comprar
                </Link>
                <Link to={`/coins/${coin.id}`} className="text-yellow-500/90">
                    Vender
                </Link>
            </td>
        </tr>
    );
};

export default MinCoin;
