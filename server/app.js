const express =require('express');
const bodyParser = require('body-parser');
const shipController = require('./controllers/shipController');

const app = express();
const route = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

route.get('/ship', shipController.getShipList);
route.get('/shiptype', shipController.getShipTypeList);
app.use(route);

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);

module.exports = app;