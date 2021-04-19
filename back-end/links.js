const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    hasListened: Boolean
  });

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

router.post('/', validUser, async (req, res) => {
    const item = new Item({
      user: req.user,
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

// get all links from all users
router.get('/all', async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// get links from a specific user
router.get('/', validUser, async(req, res) => {
    try {
        let links = await Item.find({
            user: req.user
        }).populate('user');
        return res.send(links);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put('/:id', async (req,res) => {
    try {
        let temp = await Item.findOne({
            _id: req.params.id
        });
        if (temp.hasListened == false) {
            temp.hasListened = true;
        } else {
            temp.hasListened = false;
        }
        temp.save();
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Item.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Item,
    routes: router,
}