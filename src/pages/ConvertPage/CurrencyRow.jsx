import React from 'react';

export default function CurrencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount } = props;


    return (
        <div>
            <input type="number" className='input w-7em rounded-xl py-1 px-2 focus:outline-none dark:bg-black/90 dark:text-white' value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(symbol => (
                    <option key={symbol} value={symbol}>{symbol}</option>
                ))}
                
            </select>
        </div>
    )
}