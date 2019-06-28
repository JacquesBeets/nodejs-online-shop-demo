const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

// Sets up a folder were you can serve static files that is accessable by the user
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Catch All Middleware - 404 Page Error Page
app.use(errorController.get404Error)


app.listen(30001);