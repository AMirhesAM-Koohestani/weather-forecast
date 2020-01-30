const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/4f048e7e6fac102e7ab5fd01010ada74/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Poorely formatted request!')
        } else {
            const {precipProbability: rainChance, temperature} = body.currently
            callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${rainChance * 100} % chance of rain.`)
        }
    })
}

module.exports = forecast