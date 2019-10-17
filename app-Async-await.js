const axios = require('axios');
const yargs = require('yargs');
const { key } = require('./config/keys');
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

const callGeoApi = async (address) => {
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`)
        const formatted_address = res.data.results[0].formatted_address;
        const lat = res.data.results[0].geometry.location.lat;
        const lng = res.data.results[0].geometry.location.lng;
        return {formatted_address,lat,lng}
    }
    catch (err) {
        console.log(err)
    }
}
const callDarkApi=async(lat,lng)=>{
    try {
        const res = await axios.get(`https://api.darksky.net/forecast/126749cedb50e6249320bfce68aded99/${lat},${lng}`)
        const summary = res.data.currently.summary;
        const time = res.data.currently.time;
        console.log(summary,time)
    }
    catch (err) {
        console.log(err)
    }
}
const getData=(address)=>{
    const res=callGeoApi(address);
    callDarkApi(res.lat,res.lng)
}
getData(address)