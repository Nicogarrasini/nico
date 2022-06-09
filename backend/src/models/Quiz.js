const { Schema, model, } = require('mongoose');


const quizzeslistSchema = new Schema({
    name: String,
    topic: String,
    questions: [{
            question: String
            },
            {
            answers:[{
                answer: String,
                correct: Boolean
            }]
        }]
    },
    {
    timestamps: true
})

module.exports = model('Quiz', quizzeslistSchema);