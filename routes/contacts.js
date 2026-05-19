import express from 'express';
const router = express.Router();
import mongodb from '../db/connect.js';
import { ObjectId } from 'mongodb';
import { validateContact } from '../utils/validation.js';

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
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .find({ _id: userId });
    
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const validationErrors = validateContact(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors 
      });
    }

    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone ? req.body.phone.trim() : '',
      address: req.body.address ? req.body.address.trim() : '',
      profession: req.body.profession ? req.body.profession.trim() : '',
      favoriteColor: req.body.favoriteColor ? req.body.favoriteColor.trim() : '',
      birthday: req.body.birthday ? req.body.birthday.trim() : '',
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'Contact created successfully',
        insertedId: response.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Error creating contact' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const validationErrors = validateContact(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors 
      });
    }

    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone ? req.body.phone.trim() : '',
      address: req.body.address ? req.body.address.trim() : '',
      profession: req.body.profession ? req.body.profession.trim() : '',
      favoriteColor: req.body.favoriteColor ? req.body.favoriteColor.trim() : '',
      birthday: req.body.birthday ? req.body.birthday.trim() : '',
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('contacts')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

export default router;