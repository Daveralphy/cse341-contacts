import express from 'express';
const router = express.Router();
import mongodb from '../db/connect.js';
import { ObjectId } from 'mongodb';

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json('Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) an existing contact
router.put('/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .deleteOne({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while deleting the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;