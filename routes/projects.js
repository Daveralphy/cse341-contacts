import express from 'express';
const router = express.Router();
import mongodb from '../db/connect.js';
import { ObjectId } from 'mongodb';
import { validateProject } from '../utils/validation.js';

// GET all projects
router.get('/', async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('projects')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// GET a single project by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const projectId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('cse341')
      .collection('projects')
      .find({ _id: projectId });
    
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST a new project
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validationErrors = validateProject(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors 
      });
    }

    const project = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      status: req.body.status.trim(),
      startDate: req.body.startDate ? req.body.startDate.trim() : '',
      endDate: req.body.endDate ? req.body.endDate.trim() : '',
      priority: req.body.priority ? req.body.priority.trim() : 'medium',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      createdAt: new Date(),
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('projects')
      .insertOne(project);

    if (response.acknowledged) {
      res.status(201).json({ 
        message: 'Project created successfully',
        insertedId: response.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Error creating project' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// PUT (Update) an existing project
router.put('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    // Validate request body
    const validationErrors = validateProject(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors 
      });
    }

    const projectId = new ObjectId(req.params.id);
    const project = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      status: req.body.status.trim(),
      startDate: req.body.startDate ? req.body.startDate.trim() : '',
      endDate: req.body.endDate ? req.body.endDate.trim() : '',
      priority: req.body.priority ? req.body.priority.trim() : 'medium',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      updatedAt: new Date(),
    };

    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('projects')
      .replaceOne({ _id: projectId }, project);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Project updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const projectId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('projects')
      .deleteOne({ _id: projectId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

export default router;
