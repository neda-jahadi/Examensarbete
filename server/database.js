const { MongoClient, ObjectID } = require('mongodb')
// const url = 'mongodb+srv://neda:7713601nj@cluster0.pn5gs.mongodb.net/goteborgaren_bera?retryWrites=true&w=majority';
const url = 'mongodb://localhost:27017';
const dbName = 'trip';
const cityCollectionName = 'cities';
const userCollectionName = 'users';

function getAllCities(searchword, callback) {
    get({name:{"$regex": `.*${searchword}.*`, $options: "i"}}, callback)
  }

  function getCity(id,callback) {
    get({ _id: new ObjectID(id) }, array => callback( array[0] ))
    }

  function getUser(userid,callback) {
      getUserByFilter({ _id: new ObjectID(userid) }, array => callback( array[0] ))
      }

    function loginUser(user,pass,callback) {
      getUserByFilter({username:user, password:pass}, array => callback( array[0] ) )
    }

    function userAvailibility(user, callback) {
      getUserByFilter({ username:user }, array => callback( array[0] ) )
    }

    function insertUser(newUser, callback){
      MongoClient.connect(
        url,
        {  useUnifiedTopology: true },
        async (error,client) => {
          if(error) {
            callback('"ERROR!! Could not connect"');
            return;
          }
          const col = client.db(dbName).collection(userCollectionName);
          try {
            const cursor = await col.insertOne(newUser);
            callback(cursor.insertedId);

          }catch(error) {

            console.log('Querry error:', error.message);
            callback('"ERROR!! Query error find"');
    
          } finally {
            client.close();
          }
        }
      )
    }

    function insertCity(newCity, callback) {
      key = {'name': newCity.name}
      value = newCity
        MongoClient.connect(
          url,
          {  useUnifiedTopology: true },
          async (error,client) => {
            if(error) {
              callback('"ERROR!! Could not connect"');
              return;
            }
            const col = client.db(dbName).collection(cityCollectionName);
            try {
              const cursor = await col.findOne({name: { "$regex":  newCity.name, $options: 'i'} });
              if(cursor){callback('Already exists');}
              else {
                try{
                  const cursor = await col.insertOne(newCity);
                  callback(cursor.insertedId);
                }catch(error){
                  callback('"ERROR!! Query error insert"');
                }finally{
                  client.close();
                }
              }
      
              
            }catch(error) {

              console.log('Querry error:', error.message);
              callback('"ERROR!! Query error find"');
      
            } finally {
              client.close();
            }
          }
        )
      }

      function insertEntity(id,newEntity, entityTitle,  callback) {
          
        MongoClient.connect(
          url,
          {  useUnifiedTopology: true },
          async (error,client) => {
            if(error) {
              callback('"ERROR!! Could not connect"');
              return;
            }
            const col = client.db(dbName).collection(cityCollectionName);
            try {
                if(entityTitle === 'activities' ) {
                    
                        const cursor = await col.updateOne({ _id: new ObjectID(id) }, { $push: { activities: newEntity } } );
                        callback(cursor.result);
                }
                else{
                        const cursor = await col.updateOne({ _id: new ObjectID(id) }, { $push: { restaurants: newEntity } } );
                        callback(cursor.result);
                } 

            }catch(error) {
              console.log('Querry error:', error.message);
              callback('"ERROR!! Query error"');
      
            } finally {
              client.close();
            }
          }
        )
      }

  function deleteEntity(id, entityTitle, entityname,entityaddress, callback){
   

    MongoClient.connect(
      url,
      {  useUnifiedTopology: true },
      async (error,client) => {
        if(error) {
          callback('"ERROR!! Could not connect"');
          return;
        }
        const col = client.db(dbName).collection(cityCollectionName);
        try {
            if(entityTitle === 'activity' ) {
                
                    const cursor = await col.updateOne(
                      { _id: new ObjectID(id) }, { $pull: { activities: {name: entityname , address: entityaddress} } })
                    callback(cursor.result);
            }
            else{
                    const cursor = await col.updateOne(
                      { _id: new ObjectID(id) }, { $pull: { restaurants: {name: entityname , address: entityaddress} } } );
                    callback(cursor.result);
            } 

        }catch(error) {
          console.log('Querry error:', error.message);
          callback('"ERROR!! Query error"');
  
        } finally {
          client.close();
        }
      }
    )

  }

  function get(filter, callback) {

  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      if(error) {
        console.log('error', error.message);

        callback('"ERROR!! Could not connect"');
        return;
      }
      const col = client.db(dbName).collection(cityCollectionName);
      try {
          // console.log('type of filter is:', typeof(filter));
        
        const cursor = await col.find(filter)
        const array = await cursor.toArray();
        console.log('cursor to array', array);
        callback(array);
      }catch(error) {
        console.log('Querry error:', error.message);
        callback('"ERROR!! Query error"');

      } finally {
        client.close();
      }
    }
  )
}

function getUserByFilter(filter, callback) {
  
  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      if(error) {
        console.log('error', error.message);

        callback('"ERROR!! Could not connect"');
        return;
      }
      const col = client.db(dbName).collection(userCollectionName);
      try {
        
        const cursor = await col.find(filter)
        const array = await cursor.toArray();
        console.log('cursor to array', array);
        callback(array);
      }catch(error) {
        console.log('Querry error:', error.message);
        callback('"ERROR!! Query error"');

      } finally {
        client.close();
      }
    }
  )
}

function insertNewComment(cityId,title, name, address,newComment,  callback) {
          
  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      if(error) {
        callback('"ERROR!! Could not connect"');
        return;
      }
      const col = client.db(dbName).collection(cityCollectionName);
      try { 
        if(title === 'activity') {  
            const cursor = await col.updateOne({"_id":new ObjectID(cityId), activities: { $elemMatch: { name: name , address: address } } }, {  $push: { "activities.$.comments": newComment } } )
            callback(cursor.result);
        }else{
            const cursor = await col.updateOne({"_id":new ObjectID(cityId), restaurants: { $elemMatch: { name: name , address: address } } }, {  $push: { "restaurants.$.comments": newComment } } )
            callback(cursor.result);
        }

      }catch(error) {
        console.log('Querry error:', error.message);
        callback('"ERROR!! Query error"');

      } finally {
        client.close();
      }
    }
  )
}

module.exports = {getAllCities, getCity, insertCity, insertEntity,
     deleteEntity, insertUser, getUser,loginUser, userAvailibility,insertNewComment}