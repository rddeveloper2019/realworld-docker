const express = require('express');
const axios = require('axios');
const app = express();
const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./configuration');
const mongoose = require('mongoose');
const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model('Kitten', kittySchema);

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly');
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host is ${host}`);
    console.log(`Database url ${db}`);
    console.log(`Volumes work!`);

    const silence = new Kitten({ name: 'Silence' });
    silence.save(function (err, result) {
      if (err) return console.error(err);
      console.log('result', result);
    });
  });
};

app.get('/test', (req, res) => {
  res.send('Our api is working correctly');
});
app.get('/testwithcurrentuser', (req, res) => {
  axios.get(authApiUrl + '/currentUser').then((response) => {
    res.json({ test: true, currentUserFromAuth: response.data });
  });
});

app.get('/api/testapidata', (req, res) => {
  res.json({
    testwithapi: true,
  });
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
