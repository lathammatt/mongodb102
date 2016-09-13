'use strict';

const {MongoClient} = require('mongodb')
const MongoDB_url = 'mongodb://localhost:27107/test'

// MongoClient.connect(MongoDB_url, (err, db) => {
//   console.log(db)
//   db.close() //will close mongodb connection when done
// })


MongoClient
  .connect(MongoDB_url)
  .then(db => {  //returns promise since no callback passed
    db.collection('restaurants')
      .find()
      .toArray()
      .then((restaurants) => {
        restaurants.forEach(restaurant => {
          console.log(restaurant)
        })
        db.close()
      })
      .catch(console.error)
  })
  .catch(console.error)

MongoClient
  .connect(MongoDB_url)
  .then(db => {  //returns promise since no callback passed
    db.collection('restaurants')
      .find()
      // .toArray()
      .forEach((restaurant) => { //goes over all docs
        console.log(restaurant)
      },
      () => db.close())
  })
  .catch(console.error)

