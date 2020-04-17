const { Pool, Client } = require('pg')
const express = require('express');
const app = express()

const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString: connectionString,
})

const query = (response) => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
    response.send(res)
  })
}


app.get('/', (req, res) => {
  query(res)
})

app.listen(process.env.PORT, () => {
  console.log('started');
})
