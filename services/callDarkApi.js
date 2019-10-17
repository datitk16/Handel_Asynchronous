/**
 * @param callDarkApi is module use to call api from https://darksky.net/dev 
 */

const request=require('request');

const callDarkApi=(lat,lng,callback)=>{
    request({url:`https://api.darksky.net/forecast/126749cedb50e6249320bfce68aded99/${lat},${lng}`,json:true},(err,res,body)=>{
        if(err) callback('Can not connect to server');
        const summary = body.currently.summary;
        const time = body.currently.time;
       return callback(null,{
           summary,time
       })
    })
}
module.exports={
    callDarkApi
}