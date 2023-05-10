const express = require('express');
const scorerouter = express.Router();
const scoreController = require('./../controllers/scoreController');
scorerouter
.route('/score')
.get(scoreController.getAllScores)
.post(scoreController.addingMarks)
.patch(scoreController.updatingMarks)
scorerouter
.route('/score/:id')
.get(scoreController.getMarks)
module.exports = scorerouter