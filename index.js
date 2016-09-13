'use strict';

const {MongoClient} = require('mongodb')
const MongoDB_url = 'mongodb://localhost:27017/test'
const {argv: [,,...filter]} = process
// MongoClient.connect(MongoDB_url, (err, db) => {
//   console.log(db)
//   db.close() //will close mongodb connection when done
// })

const name = RegExp(`^${filter.join(' ')}`, 'i')

//way one
MongoClient
  .connect(MongoDB_url)
  .then(db => {  //returns promise since no callback passed
    db.collection('restaurants')
      .find({name})
      .sort({name:1})
      // .toArray()
      // .then((restaurants) => {
      //   restaurants.forEach(restaurant => {
      //     console.log(restaurant)
      //   })
      // })
      // .then(() => db.close())
    .forEach(restaurant => {
        if (restaurant.name) {
          console.log(restaurant.name)
        }
      }, () => db.close())
  })
  .catch(console.error)

// //way two
// MongoClient
//   .connect(MongoDB_url)
//   .then(db => {  //returns promise since no callback passed
//     db.collection('restaurants')
//       .find()
//       // .toArray()
//       .forEach((restaurant) => { //goes over all docs
//         console.log(restaurant)
//       },
//       () => db.close())
//   })
//   .catch(console.error)

