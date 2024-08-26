let ccxt = require('ccxt');
const { GateIO } = require("ccxt")
let { HttpsProxyAgent } = require('https-proxy-agent');  // Updated import
let async = require('async');
let { Binance, Kucoin, Poloniex, gateioC, KrakenPro } = require('./config.js')

let proxyUsername = 'giwsxgap';
let proxyPassword = 'beosc83m51kh';
let proxyHost = '206.41.172.74';
let proxyPort = '6634';



let proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;
let proxyAgent = new HttpsProxyAgent(proxyUrl);


let exchanges = {
    binance: new ccxt.binance(
        {
            apiKey: Binance.apiKey,
            secret: Binance.apiSecret,
            agent: proxyAgent
        }
    ),
    gateio: new ccxt.gateio(
        {
            apiKey: gateioC.apiKey,
            secret: gateioC.apiSecret,
            agent: proxyAgent
        }
    ),
    kraken: new ccxt.kraken(
        {
            apiKey: KrakenPro.apiKey,
            secret: KrakenPro.secret,
            agent: proxyAgent
        }
    ),
    // binance: new ccxt.binance(
    //     {
    //         apiKey: BinanceFull.api_key,
    //         secret: BinanceFull.secret,
    //         agent: proxyAgent
    //     }
    // ),
    poloniex: new ccxt.poloniex(
        {
            apiKey: Poloniex.apiKey,
            secret: Poloniex.apiSecret,
            agent: proxyAgent
        }
    ),
    kucoin: new ccxt.kucoin(
        {
            apiKey: Kucoin.apiKey,
            secret: Kucoin.apiSecret,
            agent: proxyAgent
        }
    )
};

const tradeAmounts = {
    // USDT
    'BTC/USDT': 1.0,  // Example: 0.01 BTC
    'ETH/USDT': 1.0,   // Example: 0.1 ETH
    'SOL/USDT': 10,    // Example: 10 SOL
    'XRP/USDT': 1000,  // Example: 1000 XRP
    'TON/USDT': 50,    // Example: 50 TON
    'SHIB/USDT': 1000000, // Example: 1,000,000 SHIB
    'DOGE/USDT': 1000, // Example: 1000 DOGE
    'XMR/USDT': 1,     // Example: 1 XMR
    'LTC/USDT': 1,     // Example: 1 LTC
    'XLM/USDT': 1000,  // Example: 1000 XLM

    // USDC
    'BTC/USDC': 0.01,   // Example: 0.01 BTC
    'ETH/USDC': 0.1,    // Example: 0.1 ETH
    'SOL/USDC': 10,     // Example: 10 SOL
    'XRP/USDC': 1000,   // Example: 1000 XRP
    'TON/USDC': 50,    // Example: 50 TON
    'SHIB/USDC': 1000000, // Example: 1,000,000 SHIB
    'DOGE/USDC': 1000, // Example: 1000 DOGE
    'XMR/USDC': 1,     // Example: 1 XMR
    'LTC/USDC': 1,     // Example: 1 LTC
    'XLM/USDC': 1000,  // Example: 1000 XLM

    // USD
    'BTC/USD': 1,    // Example: 0.01 BTC
    'ETH/USD': 1,     // Example: 0.1 ETH
    'SOL/USD': 10,      // Example: 10 SOL
    'XRP/USD': 1000,    // Example: 1000 XRP,
    'TON/USD': 50,    // Example: 50 TON
    'SHIB/USD': 1000000, // Example: 1,000,000 SHIB
    'DOGE/USD': 1000, // Example: 1000 DOGE
    'XMR/USD': 1,     // Example: 1 XMR
    'LTC/USD': 1,     // Example: 1 LTC
    'XLM/USD': 1000,  // Example: 1000 XLM

    // BTC
    // 'SOL/BTC': 1,       // Example: 1 SOL
    // 'ETH/BTC': 0.01,    // Example: 0.01 ETH
    // 'MATIC/BTC': 10,    // Example: 10 MATIC

    // ETH
    // 'SOL/ETH': 1,       // Example: 1 SOL
    // 'MATIC/ETH': 10,    // Example: 10 MATIC
};

const minimumSpreads = {
    // USDT Pairs
    'BTC/USDT': 1.0,   // $1.00 spread for 1 BTC
    'ETH/USDT': 0.5,   // $0.50 spread for 1 ETH
    'SOL/USDT': 0.05,  // $0.05 spread for 10 SOL
    'XRP/USDT': 0.01,  // $0.01 spread for 1000 XRP
    'TON/USDT': 0.1,   // $0.10 spread for 50 TON
    'SHIB/USDT': 0.000001, // $0.000001 spread for 1,000,000 SHIB
    'DOGE/USDT': 0.001, // $0.001 spread for 1000 DOGE
    'XMR/USDT': 0.2,   // $0.20 spread for 1 XMR
    'LTC/USDT': 0.5,   // $0.50 spread for 1 LTC
    'XLM/USDT': 0.01,  // $0.01 spread for 1000 XLM

    // USDC Pairs
    'BTC/USDC': 1.0,   // $1.00 spread for 0.01 BTC
    'ETH/USDC': 0.5,   // $0.50 spread for 0.1 ETH
    'SOL/USDC': 0.05,  // $0.05 spread for 10 SOL
    'XRP/USDC': 0.01,  // $0.01 spread for 1000 XRP
    'TON/USDC': 0.1,   // $0.10 spread for 50 TON
    'SHIB/USDC': 0.000001, // $0.000001 spread for 1,000,000 SHIB
    'DOGE/USDC': 0.001, // $0.001 spread for 1000 DOGE
    'XMR/USDC': 0.2,   // $0.20 spread for 1 XMR
    'LTC/USDC': 0.5,   // $0.50 spread for 1 LTC
    'XLM/USDC': 0.01,  // $0.01 spread for 1000 XLM

    // USD Pairs
    'BTC/USD': 1.0,    // $1.00 spread for 1 BTC
    'ETH/USD': 0.5,    // $0.50 spread for 1 ETH
    'SOL/USD': 0.05,   // $0.05 spread for 10 SOL
    'XRP/USD': 0.01,   // $0.01 spread for 1000 XRP
    'TON/USD': 0.1,    // $0.10 spread for 50 TON
    'SHIB/USD': 0.000001, // $0.000001 spread for 1,000,000 SHIB
    'DOGE/USD': 0.001, // $0.001 spread for 1000 DOGE
    'XMR/USD': 0.2,    // $0.20 spread for 1 XMR
    'LTC/USD': 0.5,    // $0.50 spread for 1 LTC
    'XLM/USD': 0.01,   // $0.01 spread for 1000 XLM

    // BTC Pairs
    'SOL/BTC': 0.00001,  // 0.00001 BTC spread for 1 SOL
    'ETH/BTC': 0.0001,   // 0.0001 BTC spread for 0.01 ETH
    'MATIC/BTC': 0.00001, // 0.00001 BTC spread for 10 MATIC

    // ETH Pairs
    'SOL/ETH': 0.0001,   // 0.0001 ETH spread for 1 SOL
    'MATIC/ETH': 0.00001, // 0.00001 ETH spread for 10 MATIC
};

const symbolMapping = {
    // USDT Pairs
    'BTC/USDT': {
        coinbase: 'BTC/USD',
        binance: 'BTCUSDT',
        gateio: 'BTC_USDT',
        kraken: 'BTC/USDT',
        poloniex: 'BTC_USDT',
        kucoin: 'BTC-USDT',
    },
    'ETH/USDT': {
        coinbase: 'ETH/USD',
        binance: 'ETHUSDT',
        gateio: 'ETH_USDT',
        kraken: 'ETH/USDT',
        poloniex: 'ETH_USDT',
        kucoin: 'ETH-USDT',
    },
    'SOL/USDT': {
        coinbase: 'SOL/USD',
        binance: 'SOLUSDT',
        gateio: 'SOL_USDT',
        kraken: 'SOL/USDT',
        poloniex: 'SOL_USDT',
        kucoin: 'SOL-USDT',
    },
    'XRP/USDT': {
        coinbase: 'XRP/USD',
        binance: 'XRPUSDT',
        gateio: 'XRP_USDT',
        kraken: 'XRP/USDT',
        poloniex: 'XRP_USDT',
        kucoin: 'XRP-USDT',
    },
    'TON/USDT': {
        coinbase: 'TON/USD',
        binance: 'TONUSDT',
        gateio: 'TON_USDT',
        kraken: 'TON/USDT',
        poloniex: 'TON_USDT',
        kucoin: 'TON-USDT',
    },
    'SHIB/USDT': {
        coinbase: 'SHIB/USD',
        binance: 'SHIBUSDT',
        gateio: 'SHIB_USDT',
        kraken: 'SHIB/USDT',
        poloniex: 'SHIB_USDT',
        kucoin: 'SHIB-USDT',
    },
    'DOGE/USDT': {
        coinbase: 'DOGE/USD',
        binance: 'DOGEUSDT',
        gateio: 'DOGE_USDT',
        kraken: 'DOGE/USDT',
        poloniex: 'DOGE_USDT',
        kucoin: 'DOGE-USDT',
    },
    'XMR/USDT': {
        coinbase: 'XMR/USD',
        binance: 'XMRUSDT',
        gateio: 'XMR_USDT',
        kraken: 'XMR/USDT',
        poloniex: 'XMR_USDT',
        kucoin: 'XMR-USDT',
    },
    'LTC/USDT': {
        coinbase: 'LTC/USD',
        binance: 'LTCUSDT',
        gateio: 'LTC_USDT',
        kraken: 'LTC/USDT',
        poloniex: 'LTC_USDT',
        kucoin: 'LTC-USDT',
    },
    'XLM/USDT': {
        coinbase: 'XLM/USD',
        binance: 'XLMUSDT',
        gateio: 'XLM_USDT',
        kraken: 'XLM/USDT',
        poloniex: 'XLM_USDT',
        kucoin: 'XLM-USDT',
    },

    // USDC Pairs
    'BTC/USDC': {
        coinbase: 'BTC/USDC',
        binance: 'BTCUSDC',
        gateio: 'BTC_USDC',
        kraken: 'BTC/USDC',
        poloniex: 'BTC_USDC',
        kucoin: 'BTC-USDC',
    },
    'ETH/USDC': {
        coinbase: 'ETH/USDC',
        binance: 'ETHUSDC',
        gateio: 'ETH_USDC',
        kraken: 'ETH/USDC',
        poloniex: 'ETH_USDC',
        kucoin: 'ETH-USDC',
    },
    'SOL/USDC': {
        coinbase: 'SOL/USDC',
        binance: 'SOLUSDC',
        gateio: 'SOL_USDC',
        kraken: 'SOL/USDC',
        poloniex: 'SOL_USDC',
        kucoin: 'SOL-USDC',
    },
    'XRP/USDC': {
        coinbase: 'XRP/USDC',
        binance: 'XRPUSDC',
        gateio: 'XRP_USDC',
        kraken: 'XRP/USDC',
        poloniex: 'XRP_USDC',
        kucoin: 'XRP-USDC',
    },
    'TON/USDC': {
        coinbase: 'TON/USDC',
        binance: 'TONUSDC',
        gateio: 'TON_USDC',
        kraken: 'TON/USDC',
        poloniex: 'TON_USDC',
        kucoin: 'TON-USDC',
    },
    'SHIB/USDC': {
        coinbase: 'SHIB/USDC',
        binance: 'SHIBUSDC',
        gateio: 'SHIB_USDC',
        kraken: 'SHIB/USDC',
        poloniex: 'SHIB_USDC',
        kucoin: 'SHIB-USDC',
    },
    'DOGE/USDC': {
        coinbase: 'DOGE/USDC',
        binance: 'DOGEUSDC',
        gateio: 'DOGE_USDC',
        kraken: 'DOGE/USDC',
        poloniex: 'DOGE_USDC',
        kucoin: 'DOGE-USDC',
    },
    'XMR/USDC': {
        coinbase: 'XMR/USDC',
        binance: 'XMRUSDC',
        gateio: 'XMR_USDC',
        kraken: 'XMR/USDC',
        poloniex: 'XMR_USDC',
        kucoin: 'XMR-USDC',
    },
    'LTC/USDC': {
        coinbase: 'LTC/USDC',
        binance: 'LTCUSDC',
        gateio: 'LTC_USDC',
        kraken: 'LTC/USDC',
        poloniex: 'LTC_USDC',
        kucoin: 'LTC-USDC',
    },
    'XLM/USDC': {
        coinbase: 'XLM/USDC',
        binance: 'XLMUSDC',
        gateio: 'XLM_USDC',
        kraken: 'XLM/USDC',
        poloniex: 'XLM_USDC',
        kucoin: 'XLM-USDC',
    },

    // USD Pairs
    'BTC/USD': {
        coinbase: 'BTC/USD',
        binance: 'BTCUSD',
        gateio: 'BTC_USD',
        kraken: 'BTC/USD',
        poloniex: 'BTC_USD',
        kucoin: 'BTC-USD',
    },
    'ETH/USD': {
        coinbase: 'ETH/USD',
        binance: 'ETHUSD',
        gateio: 'ETH_USD',
        kraken: 'ETH/USD',
        poloniex: 'ETH_USD',
        kucoin: 'ETH-USD',
    },
    'SOL/USD': {
        coinbase: 'SOL/USD',
        binance: 'SOLUSD',
        gateio: 'SOL_USD',
        kraken: 'SOL/USD',
        poloniex: 'SOL_USD',
        kucoin: 'SOL-USD',
    },
    'XRP/USD': {
        coinbase: 'XRP/USD',
        binance: 'XRPUSD',
        gateio: 'XRP_USD',
        kraken: 'XRP/USD',
        poloniex: 'XRP_USD',
        kucoin: 'XRP-USD',
    },
    'TON/USD': {
        coinbase: 'TON/USD',
        binance: 'TONUSD',
        gateio: 'TON_USD',
        kraken: 'TON/USD',
        poloniex: 'TON_USD',
        kucoin: 'TON-USD',
    },
    'SHIB/USD': {
        coinbase: 'SHIB/USD',
        binance: 'SHIBUSD',
        gateio: 'SHIB_USD',
        kraken: 'SHIB/USD',
        poloniex: 'SHIB_USD',
        kucoin: 'SHIB-USD',
    },
    'DOGE/USD': {
        coinbase: 'DOGE/USD',
        binance: 'DOGEUSD',
        gateio: 'DOGE_USD',
        kraken: 'DOGE/USD',
        poloniex: 'DOGE_USD',
        kucoin: 'DOGE-USD',
    },
    'XMR/USD': {
        coinbase: 'XMR/USD',
        binance: 'XMRUSD',
        gateio: 'XMR_USD',
        kraken: 'XMR/USD',
        poloniex: 'XMR_USD',
        kucoin: 'XMR-USD',
    },
    'LTC/USD': {
        coinbase: 'LTC/USD',
        binance: 'LTCUSD',
        gateio: 'LTC_USD',
        kraken: 'LTC/USD',
        poloniex: 'LTC_USD',
        kucoin: 'LTC-USD',
    },
    'XLM/USD': {
        coinbase: 'XLM/USD',
        binance: 'XLMUSD',
        gateio: 'XLM_USD',
        kraken: 'XLM/USD',
        poloniex: 'XLM_USD',
        kucoin: 'XLM-USD',
    },

    // BTC Pairs
    // 'SOL/BTC': {
    //     coinbase: 'SOL/BTC',
    //     binance: 'SOLBTC',
    //     gateio: 'SOL_BTC',
    //     kraken: 'SOL/BTC',
    //     poloniex: 'SOL_BTC',
    //     kucoin: 'SOL-BTC',
    // },
    // 'ETH/BTC': {
    //     coinbase: 'ETH/BTC',
    //     binance: 'ETHBTC',
    //     gateio: 'ETH_BTC',
    //     kraken: 'ETH/BTC',
    //     poloniex: 'ETH_BTC',
    //     kucoin: 'ETH-BTC',
    // },
    // 'MATIC/BTC': {
    //     coinbase: 'MATIC/BTC',
    //     binance: 'MATICBTC',
    //     gateio: 'MATIC_BTC',
    //     kraken: 'MATIC/BTC',
    //     poloniex: 'MATIC_BTC',
    //     kucoin: 'MATIC-BTC',
    // },

    // ETH Pairs
    // 'SOL/ETH': {
    //     coinbase: 'SOL/ETH',
    //     binance: 'SOLETH',
    //     gateio: 'SOL_ETH',
    //     kraken: 'SOL/ETH',
    //     poloniex: 'SOL_ETH',
    //     kucoin: 'SOL-ETH',
    // },
    // 'MATIC/ETH': {
    //     coinbase: 'MATIC/ETH',
    //     binance: 'MATICETH',
    //     gateio: 'MATIC_ETH',
    //     kraken: 'MATIC/ETH',
    //     poloniex: 'MATIC_ETH',
    //     kucoin: 'MATIC-ETH',
    // },
};

// Example balances and configurations
const totalBalance = 1000;  // Total USD balance
const allocationPercentage = 0.7;  // 30% of the balance to allocate to a trade
const usdAmountToTrade = totalBalance * allocationPercentage;  // $300 to trade

// Example function to calculate the trade amount based on a percentage of your USD balance
function calculateTradeAmountInCrypto(usdAmount, askPrice) {
    return usdAmount / askPrice;  // This gives you the amount of crypto you can buy with the given USD amount
}

function calculateTotalFees(opportunity, tradeAmount, buyTakerFee, sellTakerFee, withdrawalDepositFee) {
    const buyPrice = opportunity.buy.price;
    const sellPrice = opportunity.sell.price;

    // Calculate the taker fees for both the buy and sell sides
    const buyFee = tradeAmount * buyTakerFee;  // Fee for buying on the lowest ask exchange
    const sellFee = tradeAmount * sellTakerFee;  // Fee for selling on the highest bid exchange

    // Calculate the withdrawal/deposit fees (assuming it's a flat fee based on the trade amount)
    const withdrawalFee = tradeAmount * withdrawalDepositFee;  // Withdrawal fee from the buying exchange
    const depositFee = tradeAmount * withdrawalDepositFee;  // Deposit fee to the selling exchange (if applicable)

    // Total fees include the buy fee, sell fee, and any transfer fees between exchanges
    const totalFees = buyFee + sellFee + withdrawalFee + depositFee;

    return totalFees;
}

async function startTrading() {
    try {
        const profitableTrades = [];

        for (const symbol of Object.keys(symbolMapping)) {
            const result = await runBot(symbol, usdAmountToTrade);
            if (result && result.netProfit > 0) {
                profitableTrades.push(result);
            }
        }

        if (profitableTrades.length === 0) {
            throw new Error('No profitable arbitrage opportunities detected.');
        }

        // Find the trade with the maximum profit
        const bestTrade = profitableTrades.reduce((max, trade) => trade.netProfit > max.netProfit ? trade : max, profitableTrades[0]);

        console.log(`Best arbitrage opportunity found for ${bestTrade.symbol}:`);
        console.log(`Buy on ${bestTrade.opportunity.buy.exchange} at ${bestTrade.opportunity.buy.price}`);
        console.log(`Sell on ${bestTrade.opportunity.sell.exchange} at ${bestTrade.opportunity.sell.price}`);
        console.log(`Net Profit: ${bestTrade.netProfit}`);

        // Execute the trade (this would involve placing the actual buy and sell orders)
        await executeArbitrageTrade(bestTrade.opportunity, bestTrade.tradeAmount);
    } catch (error) {
        console.error('Error during trading execution:', error);
        // logger.error('Error during trading execution:', error);
    }
}

async function executeArbitrageTrade(opportunity, tradeAmount) {
    try {
        const buyExchange = exchanges[opportunity.buy.exchange];
        const sellExchange = exchanges[opportunity.sell.exchange];

        // Example: Place the buy order
        // const buyOrder = await buyExchange.createOrder('market', 'buy', symbol, tradeAmount);
        // console.log(`Buy order placed on ${opportunity.buy.exchange}:`, buyOrder);
        console.log(`Buy order placed on ${opportunity.buy.exchange}:`);

        // Example: Place the sell order
        // const sellOrder = await sellExchange.createOrder('market', 'sell', symbol, tradeAmount);
        // console.log(`Sell order placed on ${opportunity.sell.exchange}:`, sellOrder);
        console.log(`Sell order placed on ${opportunity.sell.exchange}:`);

        console.log('Arbitrage trade executed successfully.');
    } catch (error) {
        console.error('Error executing arbitrage trade:', error);
        // logger.error('Error executing arbitrage trade:', error);
    }
}

async function runBot(symbol, usdAmountToTrade) {
    return new Promise((resolve, reject) => {
        try {
            const mappedSymbols = symbolMapping[symbol];
            if (!mappedSymbols) {
                return reject(new Error(`No symbol mapping found for ${symbol}`));
            }
            let successfulFetches = 0;

            async.parallel({
                gateio: function (marketDataCallback) {
                    exchanges.gateio.fetchTicker(mappedSymbols.gateio)
                        .then(data => marketDataCallback(null, data))
                        .catch(error => marketDataCallback(null, null));
                },
                kraken: function (marketDataCallback) {
                    exchanges.kraken.fetchTicker(mappedSymbols.kraken)
                        .then(data => marketDataCallback(null, data))
                        .catch(error => marketDataCallback(null, null));
                },
                poloniex: function (marketDataCallback) {
                    exchanges.poloniex.fetchTicker(mappedSymbols.poloniex)
                        .then(data => marketDataCallback(null, data))
                        .catch(error => marketDataCallback(null, null));
                },
                kucoin: function (marketDataCallback) {
                    exchanges.kucoin.fetchTicker(mappedSymbols.kucoin)
                        .then(data => marketDataCallback(null, data))
                        .catch(error => marketDataCallback(null, null));
                },
            }, function (err, marketData) {
                if (err) {
                    console.error('Error during parallel execution:', err);
                    return reject(err);
                }

                for (let [name, data] of Object.entries(marketData)) {
                    if (data) {
                        successfulFetches++;
                    }
                }

                // Check if we have at least 2 successful data objects
                if (successfulFetches < 2) {
                    console.error(`Insufficient data fetched. Less than 2 exchanges returned valid data for ${symbol}.`);
                    return resolve(null);
                }

                let lowestAsk = { price: Infinity, exchange: null };
                let highestBid = { price: -Infinity, exchange: null };

                // Iterate through each exchange's market data
                for (let [exchangeName, data] of Object.entries(marketData)) {
                    if (data) {
                        if (data.ask < lowestAsk.price) {
                            lowestAsk = { price: data.ask, exchange: exchangeName };
                        }
                        if (data.bid > highestBid.price) {
                            highestBid = { price: data.bid, exchange: exchangeName };
                        }
                    }
                }

                const spread = highestBid.price - lowestAsk.price;
                const minimumSpread = minimumSpreads[symbol] || 0.5;

                if (spread > minimumSpread) {
                    console.log(`Arbitrage opportunity detected for symbol ${symbol}!`);
                    console.log(`Buy on ${lowestAsk.exchange} at ${lowestAsk.price}`);
                    console.log(`Sell on ${highestBid.exchange} at ${highestBid.price}`);

                    const opportunity = { buy: lowestAsk, sell: highestBid };
                    const tradeAmount = calculateTradeAmountInCrypto(usdAmountToTrade, lowestAsk.price);

                    const buyTakerFee = (exchanges[lowestAsk.exchange].markets[symbol]?.taker) || 0.004;
                    const sellTakerFee = (exchanges[highestBid.exchange].markets[symbol]?.taker) || 0.001;

                    const grossProfit = (highestBid.price * tradeAmount) - (lowestAsk.price * tradeAmount);
                    const totalFees = calculateTotalFees(opportunity, tradeAmount, buyTakerFee, sellTakerFee, 0.01);
                    const netProfit = grossProfit - totalFees;

                    if (netProfit > 0) {
                        console.log(`Profitable arbitrage opportunity detected!`);
                        return resolve({ symbol, opportunity, grossProfit, totalFees, netProfit, tradeAmount });
                    } else {
                        console.log(`Arbitrage opportunity is not profitable after fees.`);
                        return resolve(null);
                    }
                } else {
                    console.log(`No arbitrage opportunity detected for symbol ${symbol}.`);
                    return resolve(null);
                }
            });
        } catch (error) {
            console.error('Error fetching market data:', error);
            reject(error);
        }
    });
}


// async function runBot(symbol, usdAmountToTrade) {
//     try {
//         const mappedSymbols = symbolMapping[symbol];
//         if (!mappedSymbols) {
//             throw new Error(`No symbol mapping found for ${symbol}`);
//         }
//         let successfulFetches = 0;

//         async.parallel({
//             gateio: function (marketDataCallback) {
//                 exchanges.gateio.fetchTicker(mappedSymbols.gateio)
//                     .then(data => {
//                         marketDataCallback(null, data);
//                     })
//                     .catch(error => {
//                         marketDataCallback(null, null);  // Call callback only once
//                     });
//             },
//             kraken: function (marketDataCallback) {
//                 exchanges.kraken.fetchTicker(mappedSymbols.kraken)
//                     .then(data => {
//                         marketDataCallback(null, data);
//                     })
//                     .catch(error => {
//                         marketDataCallback(null, null);  // Call callback only once
//                     });
//             },
//             poloniex: function (marketDataCallback) {
//                 exchanges.poloniex.fetchTicker(mappedSymbols.poloniex)
//                     .then(data => {
//                         marketDataCallback(null, data);
//                     })
//                     .catch(error => {
//                         marketDataCallback(null, null);  // Call callback only once
//                     });
//             },
//             kucoin: function (marketDataCallback) {
//                 exchanges.kucoin.fetchTicker(mappedSymbols.kucoin)
//                     .then(data => {
//                         marketDataCallback(null, data);
//                     })
//                     .catch(error => {
//                         marketDataCallback(null, null);  // Call callback only once
//                     });
//             },
//         }, function (err, marketData) {
//             if (err) {
//                 console.error('Error during parallel execution:', err);
//                 return
//             }

//             for (let [name, data] of Object.entries(marketData)) {
//                 if (data) {
//                     successfulFetches++;
//                 }
//             }

//             // Check if we have at least 2 successful data objects
//             if (successfulFetches < 2) {
//                 console.error(`Insufficient data fetched. Less than 2 exchanges returned valid data for ${symbol}.`);
//                 return
//             }

//             // console.log('Fetched data:', marketData);

//             // MARK :- Proceed to detecting arbitrage opportunity
//             let lowestAsk = { price: Infinity, exchange: null };
//             let highestBid = { price: -Infinity, exchange: null };

//             // Iterate through each exchange's market data
//             for (let [exchangeName, data] of Object.entries(marketData)) {
//                 if (data) {
//                     // Print the bid and ask prices for each exchange
//                     // console.log(`Exchange: ${exchangeName} for ${symbol}`);
//                     // console.log(`  Bid: ${data.bid}`);
//                     // console.log(`  Ask: ${data.ask}`);

//                     // Check for the lowest ask price (best price to buy)
//                     if (data.ask < lowestAsk.price) {
//                         lowestAsk = { price: data.ask, exchange: exchangeName };
//                     }

//                     // Check for the highest bid price (best price to sell)
//                     if (data.bid > highestBid.price) {
//                         highestBid = { price: data.bid, exchange: exchangeName };
//                     }
//                 }
//             }

//             // Calculate the spread (potential profit margin)
//             const spread = highestBid.price - lowestAsk.price;

//             // Use the coin-specific minimum spread
//             const minimumSpread = minimumSpreads[symbol] || 0.5; // Default to 0.5 if not specified

//             if (spread > minimumSpread) {
//                 console.log(`Arbitrage opportunity detected for symbol ${symbol}!`);
//                 console.log(`Buy on ${lowestAsk.exchange} at ${lowestAsk.price}`);
//                 console.log(`Sell on ${highestBid.exchange} at ${highestBid.price}`);

//                 const opportunity = {
//                     buy: lowestAsk,
//                     sell: highestBid,
//                 };

//                 // Retrieve the actual exchange objects
//                 const lowestExchange = exchanges[lowestAsk.exchange];
//                 const highestExchange = exchanges[highestBid.exchange];

//                 // Calculate the trade amount in crypto based on the USD amount to trade and the lowest ask price
//                 const tradeAmount = calculateTradeAmountInCrypto(usdAmountToTrade, lowestAsk.price);
//                 console.log(`Trade Amount: ${tradeAmount} ${symbol.split('/')[0]}`);

//                 // Additional Fees: If you need to transfer BTC between exchanges (e.g., buying on Exchange A and 
//                 // selling on Exchange B), you may also incur withdrawal fees on the sending exchange and potentially 
//                 // deposit fees on the receiving exchange. However, in many arbitrage strategies, the transfer of assets 
//                 // is avoided by maintaining balances on multiple exchanges.
//                 //
//                 // console.log('(BTC) Fees for withdrawing from lower exchange:', lowestExchange.currencies['BTC']);
//                 // console.log('(ETH) Fees for withdrawing from lower exchange:', lowestExchange.currencies['ETH']);
//                 // console.log('(SOL) Fees for withdrawing from lower exchange:', lowestExchange.currencies['SOL']);
//                 // console.log('(BTC) Fees for depositing into higher exchange:', highestExchange.currencies['BTC']);
//                 // console.log('(ETH) Fees for depositing into higher exchange:', highestExchange.currencies['ETH']);
//                 // console.log('(SOL) Fees for depositing into higher exchange:', highestExchange.currencies['SOL']);

//                 // Example: Fetching trading fees (if supported by the exchange)
//                 // This is commented out because not all exchanges support fetchTradingFee.
//                 // Uncomment if your exchange does support it.

//                 // async.parallel({
//                 //     lowestExchangeFee: function (feeCallback) {
//                 //         lowestExchange.fetchTradingFee(symbol)
//                 //         .then(feeData => {
//                 //             feeCallback(null, feeData);
//                 //         })
//                 //         .catch(error => {
//                 //             console.error(`Error fetching trading fee from ${lowestAsk.exchange}:`, error);
//                 //             feeCallback(null, null);
//                 //         });
//                 //     },
//                 //     highestExchangeFee: function (feeCallback) {
//                 //         highestExchange.fetchTradingFee(symbol)
//                 //         .then(feeData => {
//                 //             feeCallback(null, feeData);
//                 //         })
//                 //         .catch(error => {
//                 //             console.error(`Error fetching trading fee from ${highestBid.exchange}:`, error);
//                 //             feeCallback(null, null);
//                 //         });
//                 //     },
//                 // }, function (err, fees) {
//                 //     if (err) {
//                 //         console.error('Error during parallel execution:', err);
//                 //         return;
//                 //     }

//                 //     console.log('Fetched fees:', fees);
//                 // });

//                 // MARK: - Calculate fees
//                 // You can now proceed to calculate the fees using the actual exchange objects
//                 // Fetch the taker fees for buying and selling
//                 // Safely access the taker fee, defaulting to 0.004 or 0.001 if undefined
//                 const buyTakerFee = (lowestExchange.markets && lowestExchange.markets[symbol] && lowestExchange.markets[symbol].taker) || 0.004;
//                 const sellTakerFee = (highestExchange.markets && highestExchange.markets[symbol] && highestExchange.markets[symbol].taker) || 0.001;

//                 console.log(`Taker fee for buying on ${lowestAsk.exchange}:`, buyTakerFee);
//                 console.log(`Taker fee for selling on ${highestBid.exchange}:`, sellTakerFee);

//                 // Calculate the gross profit considering both spreads
//                 const grossProfit = (highestBid.price * tradeAmount) - (lowestAsk.price * tradeAmount);

//                 // Define the withdrawal and deposit fees (if applicable)
//                 let withdrawalDepositFee = 0.01; // Flat fee for this example (can be adjusted per exchange)

//                 // Calculate the total fees including taker fees and other transaction costs
//                 const totalFees = calculateTotalFees(opportunity, tradeAmount, buyTakerFee, sellTakerFee, withdrawalDepositFee);

//                 // Calculate the net profit considering the fees
//                 const netProfit = grossProfit - totalFees;

//                 console.log(`Gross Profit: ${grossProfit}`);
//                 console.log(`Total Fees: ${totalFees}`);
//                 console.log(`Net Profit: ${netProfit}`);

//                 if (netProfit > 0) {
//                     console.log(`Profitable arbitrage opportunity detected!`);
//                     return { opportunity, grossProfit, totalFees, netProfit };
//                 } else {
//                     console.log(`Arbitrage opportunity is not profitable after fees.`);
//                     return null;
//                 }


//             } else {
//                 console.log(`-------------------------------------------------------`);
//                 console.log(`No arbitrage opportunity detected for symbol ${symbol}.`);
//                 console.log(`-------------------------------------------------------`);
//                 return null;
//             }

//             // setTimeout(runBot, 10000); // Run bot again after 10 seconds
//         });
//     } catch (error) {
//         console.error('Error fetching market data:', error);
//         logger.error(`Error fetching market data for ${symbol}:`, error);
//     }
// }

// Run the bot immediately when the server starts
// runBot();
startTrading();

// Set an interval to run the bot periodically
// setInterval(runBot, 10000); // Run bot every 30 seconds