const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Note must contain at least 3 characters'],
        minlength: [3, 'Note must contain at least 3 characters']
    }
}, {timestamps: true});

mongoose.model('Note', NoteSchema);