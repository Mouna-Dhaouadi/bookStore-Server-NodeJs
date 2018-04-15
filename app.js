const express = require('express');
const app = express();

var cors = require('cors')
app.use(cors({credentials: true, origin: true}))

var port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Genre =require('./models/genre');
Book =require('./models/book');

//Auth Router
const auth=require('./routes/auth');
const authRoutes=auth.authRoutes;
app.use('/auth',authRoutes);


// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/bookstore');
//var db = mongoose.connection;

var routes = require('./routes/bookRoutes'); //importing route
routes(app); //register the route

var routes = require('./routes/genreRoutes'); //importing route
routes(app);

app.get('/', (req, res) => {
	res.send('Please use /books or /genres');
});




app.listen(port);
console.log('Running on port ...' + port);

//npm run dev to start