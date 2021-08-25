const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFydjYxOSIsImEiOiJja3M5dzR1Ym8wdW82MnVsdXVoM284YzVsIn0.TLpkEQYAzfrI5jlZJi532g&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Something went wrong :(', undefined)
        }
        else if(body.features.length === 0){
            callback('Invalid address', undefined)
        }
        else{
            const data = {'place': body.features[0].place_name,
                        'latitude': body.features[0].center[0],
                        'longitude': body.features[0].center[1] }
            
            callback(undefined, data)
        }
    })
}

module.exports = geocode