// node js backend
// node js backend
require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const UAParser = require('ua-parser-js')
// const find = require('lodash/find')

const app = express()
const path = require('path')
const port = process.env.PORT || 5000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())
app.use(express.static(path.join(__dirname, 'public')))



app.use((req, res, next) => {
    // get the type of device requesting
    const ua = UAParser(req.headers['user-agent'])
  
    res.locals.isDesktop = ua.device.type === undefined
    res.locals.isPhone = ua.device.type === 'mobile'
    res.locals.isTablet = ua.device.type === 'tablet'
  
    res.locals.Numbers = index => {
      return index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : '';
    }
  
    next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', async (req, res) => {   
    res.status(200).render('base')
})


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
