const express = require('express');

const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')


app.use(cors())

const port = 2294;


let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.use(express.static(__dirname + '/../src'));

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

let cities = [{name:'Paris'
                           , activities:[{aname: 'act61', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {aname: 'act62', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {aname: 'act63', address: 'knc jszk', comment:'ssds', likes:1 }]
                           , restaurants:[{rname: 'res61', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {rname: 'res62', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {rname: 'res63', address: 'knc jszk', comment:'ssds', likes:1 }]},
              {name:'Rome'
                          , activities:[{aname: 'act31', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {aname: 'act32', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {aname: 'act33', address: 'knc jszk', comment:'ssds', likes:1 }]
                          , restaurants:[{rname: 'res51', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {rname: 'res52', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {rname: 'res53', address: 'knc jszk', comment:'ssds', likes:1 }]}
            , {name:'Kualalampour'
                        , activities:[{aname: 'act11', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {aname: 'act22', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {aname: 'act33', address: 'knc jszk', comment:'ssds', likes:1 }]
                        , restaurants:[{rname: 'res11', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {rname: 'res22', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {rname: 'res33', address: 'knc jszk', comment:'ssds', likes:1 }]}
            , {name:'Stockholm',
                        activities:[{aname: 'act1', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                    {aname: 'act2', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                    {aname: 'act3', address: 'knc jszk', comment:'ssds', likes:1 }]
                        , restaurants:[{rname: 'res1', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                       {rname: 'res2', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                       {rname: 'res3', address: 'knc jszk', comment:'ssds', likes:1 }]}
            // , {name:'Madrid'}, {name:'London'},
            //   {name:'Tokyo'}, {name:'Rio'}, {name:'Moscow'}, {name:'Los Angeles'}, {name:'Milan'}, {name:'Sergy'}
             ]


app.get('/api/cities/', (req,res) =>{
    
    res.send(cities);
})

app.get('/api/city', (req, res) => {
    let id = Number(req.query.id)
    res.send( cities[id] )
})

app.get('/api/deleteactivity', (req,res) => {
    let cityId = Number(req.query.id1);
    let activityId = Number(req.query.id2);
    let city = cities[cityId];
    city.activities.splice(activityId,1);
    res.send('Activity is deleted');
})

app.get('/api/deleterestaurant', (req,res) => {
    let cityId = Number(req.query.id1);
    let restaurantId = Number(req.query.id2);
    let city = cities[cityId];
    city.restaurants.splice(restaurantId,1);
    res.send('Restaurant is deleted');
})

app.post('/api/addcity', (req, res) => {
    let newCity = { name: req.body.name, activities: req.body.activities, restaurants: req.body.restaurants };
    cities.push(newCity);
    res.send('New city is added');
})

app.post('/api/addactivity', (req,res) =>{
    let newActivity = {aname: req.body.name, address: req.body.address, comment: req.body.comment, likes: Number(req.body.likes) }
    let id = Number(req.query.id);
    cities[id].activities.push(newActivity);
    res.send('New activity is added');
})

app.post('/api/addrestaurant', (req,res) =>{
    let newRestaurant = {rname: req.body.name, address: req.body.address, comment: req.body.comment, likes: Number(req.body.likes) }
    let id = Number(req.query.id);
    cities[id].restaurants.push(newRestaurant);
    res.send('New restaurant is added');
})

app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})