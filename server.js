const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

//Connect db
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running.'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
