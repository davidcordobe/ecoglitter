const express = require('express');
const path = require('path');
require('dotenv').config();
const hbs = require('hbs');
const morgan = require('morgan');
const { appendFile } = require('fs');

const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan('common'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));


app.get('/', (req, res) =>{
    res.render('index')
});







app.listen(PORT, () =>{
    console.log('app andando');
})