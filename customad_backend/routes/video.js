const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../db');
const authRoute = require('../middleware/authRoute');

const router = express.Router();

router.get('/', authRoute, async function (req, res) {
    const videos = await pool.query(`
        SELECT v.filename, v.display_name, v.gap_end_times, uv.is_customisable, uv.ordinal_position FROM user_video uv
        INNER JOIN videos v ON v.video_id = uv.video_id
        WHERE uv.user_id = $1
        ORDER BY uv.ordinal_position ASC
    `, [res.locals.userId]);
    const result = videos.rows.map(video => ({
        filename: video.filename,
        displayName: video.display_name,
        gapEndTimes: video.gap_end_times,
        isCustomisable: video.is_customisable,
    }));
    res.json(result);
});

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
