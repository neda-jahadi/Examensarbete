const express = require('express');

const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')


app.use(cors())

const port = 2294;

const {getAllCities, getCity, insertCity, insertEntity, deleteEntity} = require('./database.js');

let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.use(express.static(__dirname + '/../src'));

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

let cities = [{ id: '0',name:'Paris'
                           , activities:[{name: 'act61', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'act62', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'act63', address: 'knc jszk', comment:'ssds', likes:1 }]
                           , restaurants:[{name: 'res61', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'res62', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'res63', address: 'knc jszk', comment:'ssds', likes:1 }]},
              {id: '1', name:'Rome'
                          , activities:[{name: 'act31', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'act32', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'act33', address: 'knc jszk', comment:'ssds', likes:1 }]
                          , restaurants:[{name: 'res51', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'res52', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'res53', address: 'knc jszk', comment:'ssds', likes:1 }]}
            , {id: '2', name:'Kualalampour'
                        , activities:[{name: 'act11', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'act22', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'act33', address: 'knc jszk', comment:'ssds', likes:1 }]
                        , restaurants:[{name: 'res11', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                        {name: 'res22', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                        {name: 'res33', address: 'knc jszk', comment:'ssds', likes:1 }]}
            , {id:'3', name:'Stockholm',
                        activities:[{name: 'act1', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                    {name: 'act2', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                    {name: 'act3', address: 'knc jszk', comment:'ssds', likes:1 }]
                        , restaurants:[{name: 'res1', address: 'msncjsnjs', comment:'ssds', likes:1 },
                                       {name: 'res2', address: 'Fredåsgatan 18B 31276 Göteborg', comment:'ssds', likes:1 },
                                       {name: 'res3', address: 'knc jszk', comment:'ssds', likes:1 }]}
            
             ]


app.get('/api/cities/', (req,res) =>{
    getAllCities(dataOrError =>{
        res.send(dataOrError)
      })
    // res.send(cities);
})

app.get('/api/city', (req, res) => {
    getCity(req.query.id, dataOrError => {
        res.send(dataOrError)
      } )
    // let id = Number(req.query.id)
    // res.send( cities[id] )
})

app.get('/api/deletentity', (req,res) => {
    let cityId = (req.query.id1);
    let entityTitle = (req.query.title);
    let entityDataName = req.query.entityname;
    let entityDataAddress = req.query.entityaddress;
    deleteEntity(cityId,entityTitle,entityDataName, entityDataAddress, dataOrError => {
        res.send(dataOrError)
    })
})

// app.get('/api/deleterestaurant', (req,res) => {
//     let cityId = Number(req.query.id1);
//     let restaurantId = Number(req.query.id2);
//     let city = cities[cityId];
//     city.restaurants.splice(restaurantId,1);
//     res.send('Restaurant is deleted');
// })

app.post('/api/addcity', (req, res) => {
    let newCity = { name: req.body.name, activities: req.body.activities, restaurants: req.body.restaurants };
    insertCity(newCity, dataOrError => {
        res.send(dataOrError)
      })
    // cities.push(newCity);
    // res.send('New city is added');
})

app.post('/api/add/', (req,res) =>{
    let newEntity = {name: req.body.name, address: req.body.address, comment: req.body.comment, likes: Number(req.body.likes) }
    let id = req.query.id;
    let entityTitle = req.query.title;
    insertEntity(id, newEntity, entityTitle, dataOrError => {
        res.send(dataOrError)
    } ) 

    // if(dataTitle === 'activities') {cities[id].activities.push(newItem); res.send('New activity is added'); }
    // if(dataTitle === 'restaurants') {cities[id].restaurants.push(newItem); res.send('New restaurant is added'); }
    
    
})

app.post('/api/addrestaurant', (req,res) =>{
    let newRestaurant = {name: req.body.name, address: req.body.address, comment: req.body.comment, likes: Number(req.body.likes) }
    let id = Number(req.query.id);
    cities[id].restaurants.push(newRestaurant);
    res.send('New restaurant is added');
})

app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})





// db.cities.insertOne({name:'Rome'
// , activities:[{name: 'Parco Savello', address: 'Lookouts, Parks, Gardens', comment:'It is a nice park to escape to, to enjoy', likes:1 }]
// , restaurants:[{name: 'PIERLUIGI', address: 'Piazza de’ Ricci 144, Campo de’ Fiori, Rome', comment:'mixed salad with fresh pears, pecorino cheese ', likes:1 }]})



// add to activities list
// db.cities.update({ _id: ObjectId("60001f8c981b5758410bcbdf") }, { $push: { activities: {name:'RollerCoster', address:'Wide street 432 12', likes:1, comment:'Very exciting'} } } )

//db.cities.findOne({$elemMatch:{name:'Paris'}})
//db.cities.updateOne({ name: {$nin: 'Paris'} }, {  $push: { "list.$.arr": "55555555555555555" } } )
// db.cities.update({name:'Los Angeles'}, {name:'Los Angeles', activities:[], restaurants:[]}, upsert=true)
// db.cities.findOne({})
// db.collection.update( {name: 'Rome', activities: { $nin: [{name:"Rome Pizza", address: "West st. 1234"} ] } }, {  $push: { activities: {name: 'Rome Pizza', address: 'West st. 1234'} } } )
// "_id" : ObjectId("60001f8c981b5758410bcbdf"),
// "name" : "Rome",
// "activities" : [
//         {
//                 "name" : "Parco Savello",
//                 "address" : "Lookouts, Parks, Gardens",
// db.cities.findOne({"_id" : ObjectId("60001f8c981b5758410bcbdf")}, {activities:{"name" : "Parco","address" : "Look, Gardens"}})
// db.cities.findOne(
//     {"_id" : ObjectId("60001f8c981b5758410bcbdf"), activities:{"name" : "Parco","address" : "Look, Gardens"} })
// try {
//     if(entityTitle === 'activities' ) {
//         const cursor = await col.findOne({activities:{$elemMatch:{"name" :{ "$regex":  newEntity.name, $options: 'i'} ,"address" : { "$regex":  newEntity.address, $options: 'i'}}}})
//         if(cursor){
//           callback('Activity already exist');
//         }else{
//           try{
//             const cursor = await col.updateOne({ _id: new ObjectID(id) }, { $push: { activities: newEntity } } );
//             callback(cursor.result);
//           }catch(error){
//             callback('"ERROR!! Query error insert"');
//           }finally{
//             client.close();
//           }
//         }
       
//     }
// db.cities.updateOne({ _id: ObjectId("60001f8c981b5758410bcbdf") }, { $pull: { activities: {name: 'Pitta naze', address: 'Lookouts, Parks, Gardens'} } } )

// db.cities.updateOne({ _id: ObjectId("60003d4c67f8b03cd0d27c8d") }, { $pull: { activities: {name:'Battery Park', address:'"New York, NY 10004, USA'}}})

// db.cities.updateOne({ _id: ObjectId("60001f8c981b5758410bcbdf") }, { $pull: { activities: {name: 'Parco Savello', address: 'Lookouts, Parks, Gardens'} } } )