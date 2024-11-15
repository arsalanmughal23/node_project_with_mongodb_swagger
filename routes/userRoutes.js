const express = require('express');
const { getDb } = require('../config/db');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server error
 */
router.get('/users', async (req, res) => {
  const db = getDb();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});
// router.get('/', UserController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/users', async (req, res) => {
  const db = getDb();
  const { name, email } = req.body;
  const result = await db.collection('users').insertOne({ name, email });
  res.status(201).json(result.ops[0]);
});

module.exports = router;
