const request=require("request")


const geocode=(address,callback)=>{
    const url='https://api.opencagedata.com/geocode/v1/json?key=dc3b7b3cd502498face146b578356bb1&q='+ encodeURIComponent(address) +'&pretty=1&no_annotations=1&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
           
        callback('unable to connect to weather service',undefined)
        }else if(body.results.length===0){
        callback("unable to find location.try another search")
        }else{
            
             callback(undefined,{latitude:body.results[0].geometry.lat,
                                 longitude:body.results[0].geometry.lng,
                                 city:body.results[0].components.city,
                                 state:body.results[0].components.state, 

                                })
        }
        
    })
}


module.exports=geocode
