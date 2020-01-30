const request = require('request')

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiYWxleC1hbSIsImEiOiJjazR6aTQ3bnAwYW85M21tcTA4cWt4YjNtIn0.feFfhhFk9yYAbyGIG35_Qg&limit=1`

    request({url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to map service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode