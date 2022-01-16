require('dotenv').config(); 
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const products = require('./routes/route_products');
const cards = require('./routes/route_cards');
const favorites = require('./routes/route_favorites');
const test_users = require('./routes/route_test_users');
const balance = require('./routes/route_balance');
const notifications = require('./routes/route_notifications');
const purchases = require('./routes/route_purchases');
const users = require('./routes/route_users');

app.use(express.json());


app.use('/products', products);
app.use('/cards', cards);
app.use('/favorites', favorites);
app.use('/', test_users);
app.use('/balance', balance);
app.use('/notifications', notifications);
app.use('/purchases', purchases);
app.use('/users', users);


// MONGOOSE
mongoose.connect('mongodb://mgrocery:muf8JKQmyw7zDCYHym0PWGh3O8EKegccH@35.242.162.250:27017/mGrocery', {useNewUrlParser: true, useUnifiedTopology: true});
// TSIW
//mongoose.connect('mongodb+srv://tsiw:GAa8xvmV3eKrVa8C@cluster0.b0vmz.mongodb.net/TSIW?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to MongoDB")
});

app.listen(port, function() {
    console.log(`Server running at http://localhost:${port}`);
})  