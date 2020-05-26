const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=08a5bd5111658320e4cff1e359ca3d2b&query=' + encodeURIComponent(longtitude) + ',' + encodeURIComponent(latitude) + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Please specify a valid location identifier using the query parameter.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' 
                + body.current.temperature + ' degress out. It feels like ' 
                + body.current.feelslike + ' degress out. Currently the speed of wind is ' + body.current.wind_speed + '. Humidity is ' + body.current.humidity + "."

            )
        }
    })
}

module.exports = forecast