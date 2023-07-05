const express = require('express');
const fs = require('fs');
const path = require('path');
const authRoute = require('../middleware/authRoute');

const router = express.Router();

router.get('/:videoName/ad', authRoute, function (req, res) {
    const { videoName } = req.params;
    const { videoLength, informationPreference, syntax, voice, gender, tone } = req.query;
    
    const presentation = [syntax, voice, gender, tone].join('_');
    const content = [videoLength, informationPreference].filter(x => x !== 'null').join('_');
    const srcPath = `/audios/${videoName}/${presentation}/${content}`;

    const audioPath = path.join(__dirname, `../public/${srcPath}`);
    const filenames = fs.readdirSync(audioPath);
    const result = filenames.flatMap((filename) => {
        const ext = path.extname(filename);
        if (ext !== '.mp3') {
            return [];
        }
        return {
            src: `${srcPath}/${filename}`,
            startTime: Number(path.basename(filename, ext)),
        };
    });
    const sortedResult = result.sort((a, b) => a.startTime - b.startTime);
    res.json(sortedResult);
});

module.exports = router;
