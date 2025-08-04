require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT 
const router = require('./routes');
const app = express();
app.use(morgan('dev'))

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
  
app.use(express.json());

app.use(router);

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully") )
.catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = app;