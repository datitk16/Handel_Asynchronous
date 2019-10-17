/**
 * @param request use in callback
 *  Function callGeoApi only use in callback
 */
const request = require('request');
const { key } = require('../config/keys');

const callGeoApi = (address, callback) => {
    request({ url: `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`, json: true }, (err, res, body) => {
        if (err) return callback('Can not connect to server ', null);
        else if (body.status === 'ZERO_RESULTS') {
            return callback('Please input again ');

        }
        const formatted_address = body.results[0].formatted_address;
        const lat = body.results[0].geometry.location.lat;
        const lng = body.results[0].geometry.location.lng;
        return callback(null, {
            formatted_address,
            lat,
            lng
        })
    })
}

module.exports={
    callGeoApi
}

