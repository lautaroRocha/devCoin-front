import React from 'react';

const CoinData = ({coin}) => {
    return (
        <div className=" w-full  pt-6 lg:w-[38%] grid grid-cols-2 gap-2 text-sm lg:text-xl">
        <div className="flex flex-col gap-1">
            <h4 className="text-gray-700/80 dark:text-gray-300/80">Ranking: </h4>
            <span>{coin.market_cap_rank}</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-gray-700/80 dark:text-gray-300/80">Precio actual:</h4>
            <span>${coin.current_price} USD</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-gray-700/80 dark:text-gray-300/80">Minimo en 24h:</h4>
            <span>${coin.low_24h} USD</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-gray-700/80 dark:text-gray-300/80">Maximo en 24h:</h4>
            <span>${coin.high_24h} USD</span>
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="whitespace-nowrap text-gray-700/80 dark:text-gray-300/80">
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
        <div className="flex flex-col gap-1">
            <h4 className="text-gray-700/80 dark:text-gray-300/80">Volumen total:</h4>
            <span>{coin.total_volume}</span>
        </div>
</div>
    );
}

export default CoinData;
