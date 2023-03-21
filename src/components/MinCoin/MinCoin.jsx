import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coinsContext } from '../../context';

const MinCoin = ({ coin, index }) => {
    const { prices } = useContext(coinsContext);
    let coinCurrentPrice = prices.find((prices) => prices.name === coin.name);
    const nameForLink = coin.name.toLowerCase();
    let formattedLink;

    if (nameForLink.includes(' ')) {
        formattedLink = nameForLink.replace(' ', '-');
    }

    if(coinCurrentPrice){
    return (
        <tr
            key={index}
            className="border-b bg-white text-black/90 dark:border-gray-700 dark:bg-neutral-800/20 dark:text-white"
        >
            <td className="flex items-center gap-3 py-4 pl-6">
                <Link to={`/coins/${nameForLink}`} className="flex items-center gap-3 py-4 pl-6">
                    <img className="min-w-[25px] max-w-[30px]" src={coin.image} alt={coin.name} />
                    <span className="font-bold uppercase  dark:text-white">{coin.symbol}</span>
                    <span className="text-[#707a8a] dark:text-[848e9c]">{coin.name}</span>
                </Link>
            </td>
            <td className="whitespace-nowrap pl-12">
                {parseFloat(coin.amount).toFixed(4)} {coin.symbol.toUpperCase()}
            </td>
            <td className="whitespace-nowrap pl-16">
                ${(parseFloat(coin.amount) * coinCurrentPrice.current_price).toFixed(2)}
            </td>
            <td className="whitespace-nowrap pr-4 text-center hover:cursor-pointer">
                <Link
                    to={`/coins/${formattedLink ? formattedLink : nameForLink}`}
                    className="mr-8 text-yellow-500/90 hover:underline"
                >
                    Comprar
                </Link>
                <Link
                    to={`/coins/${formattedLink ? formattedLink : nameForLink}`}
                    className="text-yellow-500/90 hover:underline"
                >
                    Vender
                </Link>
            </td>
        </tr>
    );
}
};

export default MinCoin;
