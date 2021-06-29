const express = require('express');
const dataservice = require("./service/dataservice");
const session = require('express-session')
const app = express();
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(express.json());
app.use(session({
    secret: 'randomsecurestring',
    resave: "false",
    saveUninitialized: false
}));
app.listen(3000, () => {
    console.log("server started at port:3000");
})

const authMiddleware = (req, res, next) => {
    if (!req.session.currentuser) {
        return res.json({
            statusCode: 422,
            status: false,
            message: "Please LOG IN"
        })
    }
    next();

};

// app.get('/', (req, res) => {
//     res.status(401).send("this is a get method")
// })

app.post('/register', (req, res) => {
    dataservice.register(req.body.userid, req.body.username, req.body.password)
        .then(result => (res.status(result.statusCode).json(result)))
});
app.post('/login', (req, res) => {
    dataservice.login(req, req.body.userid, req.body.password)
        .then(result => (res.status(result.statusCode).json(result)))
});

app.post('/addevent', authMiddleware, (req, res) => {
    dataservice.addevent(req, req.body.userid, req.body.eventss, req.body.datess)
        .then(result => (res.status(result.statusCode).json(result)));

});

app.get('/showhistory/:userid', authMiddleware, (req, res) => {
    dataservice.showhistory(req.params.userid)
        .then(result => (res.json(result)))
})

app.delete('/deletes/:userid/:datess/:eventss', (req, res) => {
    dataservice.deletes(req.params.userid, req.params.datess,req.params.eventss)
        .then(result => (res.json(result)))

})

app.get('/reminder/:userid/:todays', (req, res) => {
    dataservice.reminder(req.params.userid, req.params.todays)
        .then(result => (res.json(result)))
})

app.put('/updates', authMiddleware, (req, res) => {
    console.log("come", req.body.userid, req.body.datess, req.body.eventss, req.body.dates, req.body.events);
    dataservice.update(req.body.userid, req.body.datess, req.body.eventss, req.body.dates, req.body.events)
        .then(result => (res.json(result)))
})


