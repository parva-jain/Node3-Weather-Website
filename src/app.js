const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

// Define paths for Express configuration
const PublicDir = path.join(__dirname, "../public")
const ViewDir = path.join(__dirname, "../templates/views")
const PartialsDir = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewDir)
hbs.registerPartials(PartialsDir)

// Setup static directory to serve
app.use(express.static(PublicDir))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Parva Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Parva Jain'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        email: 'parvajainpjjp@gmail.com',
        name: 'Parva Jain'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {place, latitude, longitude} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            // Weather = {
            //     place: place,
            //     forecast: data
            // }
            res.send({
                place,
                forecastData
            })
        })
    })
    
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'Please provide a search query'
        })
    } else{
        console.log(req.query.search)
        res.send({
        products: []
    })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'help article not found',
        name: 'Parva Jain'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'page not found',
        name: 'Parva Jain'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})