const express = require('express');
const Joi = require('joi');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

// Register endpoint
router.post('/register', async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
    }
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

// Get all users (admin/debug)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Could not find the users', error: error.message });
    }
});

// ...existing update and delete endpoints...
router.put('/users/:id', async (req, res) => {
    try {
        const updated_user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated_user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updated_user });
    } catch (error) {
        res.status(500).json({ message: 'Could not update the user', error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deleted_user = await User.findByIdAndDelete(req.params.id);
        if (!deleted_user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deleted_user });
    } catch (error) {
        res.status(500).json({ message: 'Could not delete the user', error: error.message });
    }
});

module.exports = router;
