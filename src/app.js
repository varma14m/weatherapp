const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app=express()
// console.log(__dirname)
// console.log(__filename)

// paths for express config 
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
// setup static directory to serve
app.use(express.static(publicDirPath))

// set up handle bars and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{ 
    res.render('index',{
        title:'weather app',
        name:'suresh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'suresh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'how can i help',
        name:'suresh',
        helpText:'this is some helpful text'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
             error:'you must provide an address'
        })
    }
// res.send({
//     place:'banglore',
//     state:'karnataka',
//     address:req.query.search
// })
geocode(req.query.address,(error,{latitude,longitude,city,state}={})=>{
if(error){
    return res.send({error,})
}
forecast(latitude,longitude,(error,forecastData)=>{

    if(error){
        return res.send({error})
    }
res.send({
    forecast:forecastData,
    city,
    state,
    address:req.query.address
})
})

})

})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide search term'
       })
    }
    console.log(req.query.search)
    res.send({
        products:[] 
    })
    })
// app.get('/help/*',(req,res)=>{
//     res.send('help article not found')
//     })
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'suresh',
        errorMessage:'help article not found.'
    })
    })

 

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'suresh',
    errorMessage:'page not found.'


})
})

app.listen(3000,()=>{
    console.log('server is up to 3000.')
})

