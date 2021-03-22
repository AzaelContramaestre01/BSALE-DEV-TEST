'use strict'
const pool = require('./src/tils/config');

const express = require('express')
const app = express()
const port = 3000

app.set('port', (process.env.PORT || 3000 ));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Thanks!!')
})
app.get('/#', (request, response) => {
  response.send('Thanks!!')
})

app.listen(app.get('port'), function(){
  console.log('Working on port: ', app.get('port'));
});

//Api construction
app.get('/api', (request, response) => {
  pool.query('SELECT product.*, category.name as name_category FROM product LEFT JOIN category ON product.category = category.id order by name_category', (error, result) => {
      if (error) throw error;

      response.send(result);
  });
});

//Search by name
app.get('/api/:name_product', (request, response) => {
  const name_product = request.params.name_product;
  pool.query('SELECT product.*, category.name as name_category FROM product LEFT JOIN category ON product.category = category.id WHERE product.name like ?', name_product+'%', (error, result) => {
      if (error) throw error;
      response.send(result);
  });
});