const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8f90223f7871aadf2e8ab213e314d85&query=' + long.toString() + ',' + lat.toString() + '&units=m'

    request({url, json:true}, (error, {body} = {}) => {
        if (error){
            callback('Something went wrong', undefined)
        }
        else if (body.error){
            callback('Invalid geolocation', undefined)
        }
        else {
            callback(undefined, "It is currently "+ body.current.temperature +" °C. It feels like " + body.current.feelslike + " °C out. The sky is " + body.current.weather_descriptions[0] + " here. Humidity is " + body.current.temperature + "% and wind direction is " + body.current.wind_dir + ".")
        }

    })
}

module.exports = forecast