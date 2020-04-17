const { Pool, Client } = require('pg')
const express = require('express');
const app = express()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString: connectionString,
})

pool.query('drop table if exists test; create table test (id serial, name text); insert into test (name) values (yeet),(yeet);')

// const query = (response) => {
//   pool.query('select *  from test', (err, res) => {
//     console.log(err, res)
//     response.send(res)
//   })
// }

const db = {
  query: () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from test', (err, res) => {
        console.log(err, res)
        if(err){reject(err)}
        resolve(res)
      })
    });
  }
}




app.get('/', (req, res) => {
  db.query().then(q=>{
    res.send(q)
  }).catch(err=>res.status(500).send(err))
})

app.listen(process.env.PORT, () => {
  console.log('started');
})
