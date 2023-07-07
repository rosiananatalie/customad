const express = require('express');
const fs = require('fs');
const path = require('path');
const authRoute = require('../middleware/authRoute');

const router = express.Router();

router.post('/', authRoute, function (req, res) {
    const { userId } = res.locals;
    const { video, logs } = req.body;

    const logsInJson = JSON.parse(logs);
    const startTime = logsInJson[0].timestamp;
    const prettyJson = JSON.stringify(logsInJson, null, 2);

    const dirname = path.join(__dirname, `../logs/user_${userId}`);
    const logPath = `${dirname}/${video}_${startTime}.json`;

    fs.mkdir(dirname, { recursive: true }, (err) => {
        if (err) return console.error(err);
        fs.writeFile(logPath, prettyJson, err => {
            if (err) return console.error(err);
        });
      });
    res.end();
});

module.exports = router;
