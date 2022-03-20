const express = require('express');
const axios = require('axios');
const app = express();
const { connectDb } = require('./helpers/db');
const { host, port, db, apiUrl } = require('./configuration');

app.get('/test', (req, res) => {
  res.send('Our auth server is working correctly');
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
  });
};

app.get('/test', (req, res) => {
  res.send('Our auth server is working correctly');
});

app.get('/api/currentUser', (req, res) => {
  res.json({
    id: 1234,
    email: 'user@gmail.com',
  });
});

app.get('/testwithapidata', (req, res) => {
  axios.get(apiUrl + '/testapidata').then((response) => {
    res.json({
      testapidata: response.data,
    });
  });
});
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
