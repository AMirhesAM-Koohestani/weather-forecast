const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amir Hessam K'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amir Hessam K'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For more information please subscribe now!',
        title: 'Help',
        name: 'Amir Hessam K'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address && !req.query.location) {
        return res.send({
            error: 'You must provide an address or a location term'
        })
    }

    const address = req.query.address

    if (address) {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData.message,
                    address
                })
            })
        })
    } else {
        const coords = req.query.location.split(',')
        const latitude = coords[0]
        const longitude = coords[1]
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: forecastData.timezone,
                forecast: forecastData.message,
            })
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Amir Hessam K'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Amir Hessam K'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})