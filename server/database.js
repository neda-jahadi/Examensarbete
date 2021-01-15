const { MongoClient, ObjectID } = require('mongodb')
// const url = 'mongodb+srv://neda:7713601nj@cluster0.pn5gs.mongodb.net/goteborgaren_bera?retryWrites=true&w=majority';
const url = 'mongodb://localhost:27017';
const dbName = 'trip';
const collectionName = 'cities';

function getAllCities(callback) {
    get({}, callback)
  }

  function getCity(id,callback) {
    get({ _id: new ObjectID(id) }, array => callback( array[0] ))
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
            const col = client.db(dbName).collection(collectionName);
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
            const col = client.db(dbName).collection(collectionName);
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

  function get(filter, callback) {
    console.log('1');
  MongoClient.connect(
    url,
    {  useUnifiedTopology: true },
    async (error,client) => {
      console.log('2');
      if(error) {
        console.log('error', error.message);

        callback('"ERROR!! Could not connect"');
        return;
      }
      console.log('3');
      const col = client.db(dbName).collection(collectionName);
      try {
          console.log('type of filter is:', typeof(filter));
        
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

module.exports = {getAllCities, getCity, insertCity, insertEntity}