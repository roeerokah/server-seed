import { Products } from "./products"

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/products/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.get('/', function (req, res, next) {
    const message = new Products().getMessage() 
    const paramsArr = [];
    if (!req.query) {
        res.status(200).json({ msg: 'no paramers was inserted' })
    } else {
        for(let param in req.query) {
            paramsArr.push({key: param,value: req.query[param]})
        }
        res.status(200).json({ msg: 'Hello World with  script!' + message, pramasArr: paramsArr })
    }
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})
