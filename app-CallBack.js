/**
 * @param CallBack Handel callback
 */

const { callDarkApi } = require('./services/callDarkApi');
const { callGeoApi } = require('./services/callGeoApi');


const yargs = require('yargs');
const argy = yargs.option
    ({
        a: {
            alias: 'address',
            demand: true,
            string: true,
            describe: "Pless enter your address",

        }
    }).help()
    .alias('h', 'help')
    .argv;
const address = argy.address;
callGeoApi(address, (err, res) => {
    callDarkApi(res.lat, res.lng, (err, res) => {
        console.log(res)
    })
})