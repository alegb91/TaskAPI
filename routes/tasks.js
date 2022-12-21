const express = require('express');

const router = express.Router();

const {
    getAllTask,
    createTask,
    getOneTask,
    deleteTask,
    updateTask

} = require('../controllers/tasks');

router.route('/').get(getAllTask).post(createTask);

router.route('/:id').get(getOneTask).delete(deleteTask).patch(updateTask);

module.exports = router;

