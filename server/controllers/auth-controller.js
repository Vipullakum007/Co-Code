const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userCreated = await User.create({
            username, email, password
        });
        res.status(201).json({
            message: 'User registered successfully', token: await userCreated.generateToken(), userId: userCreated._id.toString()
        });
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = await bcrypt.compare(password, userExists.password);

        console.log(user);
        if (user) {
            res.status(200).json({ message: 'User logged in successfully', token: await userExists.generateToken(), userId: userExists._id.toString() });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
    }
}

// user logic to send user data
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({ userData });
    } catch (error) {
        console.error(`error from user route ${error}`)
    }
};

module.exports = { register, login, user };