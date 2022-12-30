require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname).replace(/ /g, ''));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") cb(null, true);
    else cb(null, false);
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/feed', feedRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message: message });
});

mongoose.connect(process.env.MONGODB).then(result => {
    const server = app.listen(8080);
    console.log("Connected to DB");
    const io = require('./socket').init(server);
    io.on('connection', socket => {
        console.log("Client connected!");
    })
}).catch(err => console.log(err));