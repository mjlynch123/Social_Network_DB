const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp) // Custom getter to format the timestamp
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

function dateFormat(timestamp) {
    // Custom date formatting logic (you can use libraries like Moment.js if desired)
    return new Date(timestamp).toISOString();
}

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;