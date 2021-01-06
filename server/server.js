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
    res.send(cities);
})


app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})