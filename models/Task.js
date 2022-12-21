const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a task']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    subTasks: [ String ],
    checked: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);

