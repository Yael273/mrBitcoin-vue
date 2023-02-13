import axios from 'axios'
import {storageService} from "./storage.service.js"

const urlRate = 'https://blockchain.info/tobtc?currency=USD&value=1'
const marketPriceHistory = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
const AverageBlockSize = 'https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true'

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}

async function getRate() {
    let rate = storageService.load('rate')
    if(rate) return rate
    try {
        rate = await axios.get(urlRate)
        storageService.save('rate', rate.data)
        return rate.data
    }
    catch (err) {
        throw new Error('Err', err)
    }
}
async function getMarketPriceHistory() {
    let pricesHistory = storageService.load('prices-history')
    if(pricesHistory) return pricesHistory
    try {
        pricesHistory = await axios.get(marketPriceHistory)
        storageService.save('pricesHistory', pricesHistory.data)
        return pricesHistory.data
    }
    catch (err) {
        throw new Error('Err', err)
    }
}
async function getAvgBlockSize() {
    let AverageBlock = storageService.load('Average-block')
    if(AverageBlock) return AverageBlock
    try {
        AverageBlock = await axios.get(AverageBlockSize)
        storageService.save('AverageBlock', AverageBlock.data)
        return AverageBlock.data
    }
    catch (err) {
        throw new Error('Err', err)
    }
}