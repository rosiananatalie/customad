const express = require('express');
const bcrypt = require ('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authRoute = require('../middleware/authRoute');

// get config vars
dotenv.config();

const router = express.Router();

router.post('/login', async function (req, res) {
  const { username, password } = req.body;
  const users = await pool.query('SELECT user_id, password, display_name FROM users WHERE username = $1', [username]);
  if (users.rows.length === 0) {
    return res.status(401).send({
      error: {
        code: 401,
        message: 'Username or password is incorrect',
      }
    });
  }
  const user = users.rows[0];
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).send({
      error: {
        code: 401,
        message: 'Username or password is incorrect',
      }
    });
  }
  const payload = { id: user.user_id };
  const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '43200s' });
  res.json({
    token: jwtToken,
    displayName: user.display_name,
  });
});

router.post('/verify', authRoute, function (req, res) {
  res.json({
    verified: true,
    displayName: res.locals.displayName,
  });
});

router.post('/signUp', async function (req, res) {
  const { username, password, name } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const queryText = 'INSERT INTO users(username, password, display_name) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, hashedPassword, name];
  pool.query(queryText, values, function (err, result) {
    if (err) {
      return res.status(500).send({
        error: {
          code: 500,
          message: err.detail,
        }
      });
    }
    const user = result.rows[0];
    const payload = { id: user.user_id };
    const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '43200s' });
    return res.json({
      token: jwtToken,
      displayName: user.display_name,
    });
  });
});

module.exports = router;
