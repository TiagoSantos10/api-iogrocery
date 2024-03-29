require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const products = require('./routes/route_products');
const cards = require('./routes/route_cards');
const favorites = require('./routes/route_favorites');
const balance = require('./routes/route_balance');
const notifications = require('./routes/route_notifications');
const purchases = require('./routes/route_purchases');
const users = require('./routes/route_users');
const roles = require('./routes/route_roles');
const calories = require('./routes/route_calories');
const auth = require('./routes/route_auth');

//Swagger
const expressSwagger = require('express-swagger-generator')(app)
const options = require('./config/swagger_conf')
expressSwagger(options)

app.use(express.json());


app.use('/products', products);
app.use('/cards', cards);
app.use('/favorites', favorites);

app.use('/balance', balance);
app.use('/notifications', notifications);
app.use('/purchases', purchases);
app.use('/users', users);
app.use('/roles', roles);
app.use('/calories', calories);
app.use('/login', auth);


// MONGOOSE
mongoose.connect('mongodb://mgrocery:muf8JKQmyw7zDCYHym0PWGh3O8EKegccH@35.242.162.250:27017/mGrocery', { useNewUrlParser: true, useUnifiedTopology: true });
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