const path = require('path')
const express = require('express')
const hbs = require('hbs')

const authCode = require('./service/authorization')
const fuelPriceLocation = require('./service/fuelPriceLocation')

//Defin paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


const app = express()
const port = process.env.PORT || 3000

//Setup handlebars engine
app.set('view engine', 'hbs')
//The views directory that handlebars will look for
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'You seriously dont know how to use a textbox and button?',
        title: 'Help',
        name: 'Navanga'
    })
})

app.get('/location', (req, res) => {
    if(!req.query.postCode) {
        return res.send({
            error: 'You must provide a postcode'
        })
    }

    const getAuthCode = authCode((error, authCode) => {
        if(error) {
            console.log({error: error})
        } else {
    
            console.log('Access token is : ' + authCode);
            fuelPriceLocation(authCode, req.query.postCode, (error, {priceError, stations, prices}) => {
                debugger
                console.log(stations)
                console.log(prices)

                res.send({
                    stations: stations,
                    prices: prices
                })
            })
    
        }
    })
})


app.get('', (req, res) => {
    res.render('index', {
        title: 'NSW Fuel Data App',
        name: 'Navanga'
    })
})


//port 3000
app.listen(port, ()=>{
    console.log('Server has started on port ' + port)
})





