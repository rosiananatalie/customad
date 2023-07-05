const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const pool = require('../db');

// get config vars
dotenv.config();

module.exports = async (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		const token = req.headers.authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.TOKEN_SECRET);
		const userId = payload.id;
		const users = await pool.query('SELECT display_name FROM users WHERE user_id = $1', [userId]);
		if (users.rows.length === 0) {
			return res.status(401).send({
				error: {
					code: 401,
					message: 'Unauthorized',
				}
			});
		}
		const user = users.rows[0];
		res.locals.userId = userId;
		res.locals.displayName = user.display_name;
		next();
	} else {
		return res.status(401).send({
			error: {
				code: 401,
				message: 'Unauthorized',
			}
		});
	}
};
