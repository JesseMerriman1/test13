const UserAuthentication = require('../models/user_authentication');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userAuthenticationController = {
    // Register a new user
    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // hide password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await UserAuthentication.createUser({ username, hashedPassword });
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // login information
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await UserAuthentication.findUserByUsername(username);

            if (user && bcrypt.compareSync(password, user.hashed_password)) {
                // for assigning login tokens
                const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.header('auth-token', token).json({ message: "Logged in successfully", token });
            } else {
                res.status(400).send("Username or password is wrong");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

};

module.exports = userAuthenticationController;
