const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/User');


//app
const app = express();

// mongoose.connect(URI, {

// useNewUrlParser: true, 

// useUnifiedTopology: true 

// }, err => {
// if(err) throw err;
// console.log('Connected to MongoDB!!!')
// });

// db
// mongoose
//  .connect(process.env.DATABASE,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
//  .then(() => console.log('DB Connected'));


function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }

const port = process.env.PORT || 8000;
const URI = process.env.DATABASE;

//db
mongoose
 .connect(process.env.DATABASE)
 .then(() => console.log('DB Connected'));


app.get('/', function(req, res, next) {
    res.send("Hello world");
});
app.use(ignoreFavicon);
//middlewares
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());
//app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
//routes middleware


app.listen(port, () => {
  console.log(`Server is running on ${port} & URI is ${URI}`)
});

app.use('/api', authRoutes);

