const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/gctalks', {
  useNewUrlParser: true
});

// Create a scheme for talks: a path and a bool to see if I have listened to it yet.
const itemSchema = new mongoose.Schema({
    path: String,
    hasListened: Boolean
  });

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async (req, res) => {
    const item = new Item({
      path: req.body.path,
      hasListened: false,
    });
    try {
      await item.save();
      res.send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

app.get('/api/items', async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.listen(3000, () => console.log('Server listening on port 3000!'));

  