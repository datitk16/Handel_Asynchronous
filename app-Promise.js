/**
 * @param Promise handel Promise 
 * Use: node .\app-Promise.js -a "Nghe an"
 */

const axios = require('axios');
const { key } = require('./config/keys');


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
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`)
    .then(res => {
        if (res.data.status === 'ZERO_RESULTS') {
            //Promise.reject if(err) err push catch
            return Promise.reject({
                status: 404,
                message: 'Address error'
            })
        }
        const formatted_address = res.data.results[0].formatted_address;
        const lat = res.data.results[0].geometry.location.lat;
        const lng = res.data.results[0].geometry.location.lng;
       
        
        return Promise.all([
            axios.get(`https://api.darksky.net/forecast/126749cedb50e6249320bfce68aded99/${lat},${lng}`),
            formatted_address
        ])
    })
    .then(res=>{
        const summary = res[0].data.currently.summary;
        const time = res[0].data.currently.time;
        const formatted_address = res[1];
        console.log(formatted_address)
        console.log(summary, time)
    })
    .catch(err=>{
       if(err.status===400){
           return console.log(message)
       }
       else{
           return console.log("Can not connect to server");
       }
    })