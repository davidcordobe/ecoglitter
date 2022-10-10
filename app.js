const express = require('express');
const path = require('path');
require('dotenv').config();
const hbs = require('hbs');
const morgan = require('morgan');
const { appendFile } = require('fs');
const MongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan('common'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

MongoClient.connect(process.env.MONGOLOCAL, (err) =>{
    if (err) throw err;
    console.log(`conectado a mongo a la database ${process.env.DATABASE}`);
})

app.get('/', (req, res) =>{
    res.render('index')
});



app.get('/contacto', (req, res) =>{
    res.render('contacto')
});

app.post('/contacto', (req, res)=>{
    const {nombre, apellido, telefono, email, mensaje} = req.body;

    MongoClient.connect(process.env.MONGOLOCAL, (err, db)=>{
        const database = db.db(process.env.DATABASE);
        if (err){
            throw err;
        }else{
            database.collection('ecoglitters').insertOne({nombre, apellido, telefono, email, mensaje}, (err)=>{
                if (err){

                }else{
                    res.render('contacto')
                }
            })
        }
    })
})





app.listen(PORT, () =>{
    console.log('app andando');
})