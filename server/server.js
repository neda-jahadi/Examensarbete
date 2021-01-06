const express = require('express');

const bodyParser = require('body-parser');
const app = express();


const port = 2294;


let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.use(express.static(__dirname + '/../src'));

let cities = ['Paris', 'Rome', 'Kualalampour', 'Stockholm', 'Madrid', 'London',
                  'Tokyo', 'Rio', 'Moscow', 'Los Angeles', 'Milan', 'Sergy', ]

app.get('/api/cities', (req,res) =>{
    console.log(req.query);
    let index= req.query.index;
    res.send(cities);
})

app.get('/express_backend', (req, res) => {

    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})