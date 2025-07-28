const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(bodyParser.json());


const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mycruddb'; // local

const authRoutes = require('./routes/authRoutes');
// or Atlas: 'mongodb+srv://<username>:<password>@cluster.mongodb.net/mycruddb'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ Connection error:', err));

app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);


app.use('/uploads', express.static('uploads'));

app.use('/api/files', uploadRoutes);


app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
