console.log('Hello1');
const express = require('express');

const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')


app.use(cors())

// const port = 2294;
const port = process.env.PORT || 2294; 

const {getAllCities, getCity, insertCity, insertEntity, insertFan,unvoteEntity, deleteFan,
         deleteEntity, insertUser, getUser,loginUser, userAvailibility,insertNewComment, voteEntity} = require('./database.js');
const { Db } = require('mongodb');

let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

console.log('Hello2');

app.use(express.static(__dirname + '/../build'));
// app.use(express.static(__dirname + '/../src'));

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

app.get('/api/unvotentity' , (req,res) => {
    let cityId = req.query.id1;
    let title = req.query.title;
    let entityname = req.query.entityname;
    let entityaddress = req.query.entityaddress;
    unvoteEntity(cityId,title,entityname,entityaddress, dataOrError => {
        res.send(dataOrError)
    })
})

app.get('/api/deletefan' , (req,res) => {
    let cityId = req.query.id1;
    let userId = req.query.userid;
    let title = req.query.title;
    let entityname = req.query.entityname;
    let entityaddress = req.query.entityaddress;
    deleteFan(cityId,userId,title,entityname,entityaddress, dataOrError => {
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
         comments: req.body.comments, likes: Number(req.body.likes),
         lovers: req.body.lovers, owner: req.body.owner }
         
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

