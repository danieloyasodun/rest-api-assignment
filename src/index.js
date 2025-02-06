const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = {};

// Create a User
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({success: false, message: 'Name and email are required'});
    }

    const id = uuidv4();
    users[id] = {id, name, email};

    res.status(201).json(users[id]);
});

// Retrieve a User
app.get('/users/:id', (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json(user);
});

// Update a User
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({success: false, message: 'User not found'});
    }

    if (!name || !email) {
        return res.status(400).json({success: false, message: 'Name and email are required'});
    }

    users[req.params.id] = {id: req.params.id, name, email};

    res.json(users[req.params.id]);
});

// Delete a User
app.delete('/users/:id', (req, res) => {
    if (!users[req.params.id]) {
        return res.status(404).json({ success: false, message: 'User not found'});
    }

    delete users[req.params.id];

    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing