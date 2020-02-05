const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/4f048e7e6fac102e7ab5fd01010ada74/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Poorely formatted request!')
        } else {
            const { precipProbability: rainChance, temperature } = body.currently
            const { temperatureHigh: highTemp, temperatureHighTime: highTime, temperatureLow: lowTemp, temperatureLowTime: lowTime, summary: todaySummary } = body.daily.data[0]
            callback(undefined,
                `${todaySummary}
It is currently ${temperature}° out.
There is a ${rainChance * 100} % chance of rain.
Maximum temperature is ${highTemp}° around ${toRealHour(highTime)} o'clock with minimum of ${lowTemp}° around ${toRealHour(lowTime)} o'clock.
Tomorrow will be ${body.daily.data[1].summary.toLowerCase()}`)
        }
    })
}

const toRealHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getHours();
}

module.exports = forecast