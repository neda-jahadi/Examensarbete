const express = require('express');

const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')


app.use(cors())

const port = 2294;

const {getAllCities, getCity, insertCity, insertEntity, insertFan,
         deleteEntity, insertUser, getUser,loginUser, userAvailibility,insertNewComment, voteEntity} = require('./database.js');
const { Db } = require('mongodb');

let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.use(express.static(__dirname + '/../src'));

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )




app.get('/api/cities/', (req,res) =>{
    // let searchword = req.query.searchword;
    getAllCities( dataOrError =>{
        res.send(dataOrError)
      })
})

app.get('/api/city', (req, res) => {
    getCity(req.query.id, dataOrError => {
        res.send(dataOrError)
      } )
    
})

app.get('/api/user', (req, res) => {
    getUser(req.query.userid, dataOrError => {
        res.send(dataOrError)
      } )
    
})

app.get('/api/login', (req,res) => {
    let user = req.query.username;
    let pass = req.query.password;
    loginUser(user, pass, dataOrError => {
        res.send(dataOrError)
    })
})

app.get('/api/useravailibility', (req,res) => {
    let user = req.query.username;
    userAvailibility(user, dataOrError => {
        res.send(dataOrError)
    })
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

app.get('/api/votentity' , (req,res) => {
    let cityId = req.query.id1;
    let title = req.query.title;
    let entityname = req.query.entityname;
    let entityaddress = req.query.entityaddress;
    voteEntity(cityId,title,entityname,entityaddress, dataOrError => {
        res.send(dataOrError)
    })
})

app.get('/api/insertfan' , (req,res) => {
    let cityId = req.query.id1;
    let userId = req.query.userid;
    let title = req.query.title;
    let entityname = req.query.entityname;
    let entityaddress = req.query.entityaddress;
    insertFan(cityId,userId,title,entityname,entityaddress, dataOrError => {
        res.send(dataOrError)
    })
})

app.post('/api/addcity', (req, res) => {
    let newCity = { name: req.body.name, activities: req.body.activities, restaurants: req.body.restaurants };
    insertCity(newCity, dataOrError => {
        res.send(dataOrError)
      })
})

app.post('/api/adduser', (req, res) => {
    let newUser = { name: req.body.name, username: req.body.username, password: req.body.password };
    insertUser(newUser, dataOrError => {
        res.send(dataOrError)
      })
})

app.post('/api/add/', (req,res) =>{
    let newEntity = {name: req.body.name, address: req.body.address,
         comments: req.body.comments, likes: Number(req.body.likes), lovers: req.body.lovers }
    let id = req.query.id;
    let entityTitle = req.query.title;
    insertEntity(id, newEntity, entityTitle, dataOrError => {
        res.send(dataOrError)
    } )      
})

app.post('/api/addcomment/', (req,res) =>{
    let newComment = { name: req.body.name, comment: req.body.comment }
    let cityId = req.query.cityid;
    let title = req.query.title;
    let name = req.query.name;
    let address = req.query.address;

    insertNewComment(cityId,title,name,address, newComment, dataOrError => {
        res.send(dataOrError)
    } )   
})

app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})


// db.cities.updateOne({"_id":ObjectId("60001c3b53ee671e497156ca"), activities: { $elemMatch: { name: "knkmnkm" , address: "c mc m" } } }, {  $push: { "activities.$.comments": {id: ObjectId("6006cad8b4c6da2f06047971"), name: 'Neda', comment:'Again test hope'} } } )
// db.cities.updateOne({"_id":ObjectId("60001c3b53ee671e497156ca"), activities: { $elemMatch: { name: "name" , address: "address" } } }, {  $push: { "activities.$.comments": {id: ObjectId("6006cad8b4c6da2f06047971"), name: 'Neda', comment:'Do it again for Paris'} } } )
//db.cities.updateOne({"_id":ObjectId("60001c3b53ee671e497156ca"), activities: { $elemMatch: { name: 'Hotellerbjudanden - Paris' } } } )
// db.cities.findOne({{"_id":ObjectId("60001c3b53ee671e497156ca")}, {activities:{name: 'Hotellerbjudanden - Paris'}}})
//db.cities.updateOne({"_id":ObjectId("60001c3b53ee671e497156ca"), restaurants: { $elemMatch: { name: "Good foood" , address: "Good avenue 123 44" } } }, {  $push: { "restaurants.$.lovers": "6006cad8b4c6da2f06047971" } } )