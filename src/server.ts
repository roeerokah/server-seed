import { Products } from "./products"
import {getParticipantsSpreadsheet} from "./google-spreadsheet.service";
import {getOfflineData} from "./csv.service";

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/participants', (req, res, ) => {
  if (req.query.offline) {
    getOfflineData('src/data2.csv').then(participants => {
      res.json(participants);
    });
  } else {
    getParticipantsSpreadsheet().then(participants => {
      res.json(participants);
    });
  }
})
app.get('/products/:id', (req, res, ) => {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.get('/', (req, res, next) => {
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

app.listen(80, () => {
    console.log('CORS-enabled web server listening on port 80')
})
