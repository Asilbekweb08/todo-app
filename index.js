const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || "mongodb+srv://asilbekweb:fortest001@tester001.wpzwjri.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
