import { object } from 'prop-types'
import React, { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.coingecko.com/api/v3/ping'

export default function Convert() {
    const [ currencyOptions, setCurrencyOptions] = useState([])
    console.log(currencyOptions)
    const [fromCurrency, setFromCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    
    let toAmount, fromAmount
    if(amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect (() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data => { 
            const firstcurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])})
            setFromCurrency(data.base)
            setToCurrency(firstcurrency)
            setExchangeRate(data.rates[firstcurrency])
    }, [])

    useEffect(() => {
        if(fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency]);

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    
    
    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
    //probar esto de ultima en app.jsx
    <div>
        <h1>Convert</h1>
        <CurrencyRow 
            currencyOptions={currencyOptions}
            selectCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
        />
            <div className="equals"> = </div>
        <CurrencyRow
            currencyOptions={currencyOptions}
            selectCurrency={toCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
        />
    </div>
  )
}
