const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/eventapp', { useNewUrlParser: true, useUnifiedTopology: true })

const User = mongoose.model('User', {
    userid: String,
    username: String,
    password: String
})

const Event = mongoose.model('Event', {

    userid: String,
    plans: [
        {
            Date: String,
            Event: String
        }]
})




module.exports = { User, Event }