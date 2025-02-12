 const path = require('path')
 const express = require('express')
 const hbs = require('hbs')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')

const app =  express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Edgaras Avagyan'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About page',
        name: 'Edgaras Avagyan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a a help page!',
        name: 'Edgaras Avagyan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
            if(error) {
               return res.send({error})
            } 
            forecast(longitude, latitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                 } 
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })

            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {

    res.render('error', {
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Edgaras Avagyan'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Page not found!',
        name: 'Edgaras Avagyan'
    })
})

 app.listen(port, () => {
     console.log('Server is up on port ' + port)
 })

 