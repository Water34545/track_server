require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express() ;
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://admin:3454549qq@cluster0.laffd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {});
mongoose.connection.on('connected', () => {
  console.log("connected"); 
});
mongoose.connection.on('error', (err) => {
  console.log("error", err); 
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000"); 
});