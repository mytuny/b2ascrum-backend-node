const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/b2ascrum', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB.'));

const columnsRouter = require('./routes/columns');
const cardsRouter = require('./routes/cards');

app.use(express.json());
app.use('/api/columns', columnsRouter);
app.use('/api/cards', cardsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`b2aScrum backend server is running on port ${port}...`));