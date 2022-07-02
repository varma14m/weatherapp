const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=745c1b09cebd354aaaf72506bdd8d245&query='+ longitude +',' + latitude +'&units=m'

request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to weather service',undefined)
    }else if(body.error){
        callback("unable to find location",undefined)
    }else{
        callback(undefined,` ${body.current.weather_descriptions}.it is currently ${body.current.temperature} degrees out.it feels like ${body.current.feelslike} degree out`) 
        
    }
         

})
}





module.exports=forecast























