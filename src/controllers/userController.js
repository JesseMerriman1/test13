const Users = require('../models/users');

const userController = {
    // pull all users at once
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.getAllUsers();
            res.json(users);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // pull a single user by ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.getUserById(id);

            if (user) {
                res.json(user);
            } else {
                res.status(404).send("User not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            const { name, email, role } = req.body;
            const newUser = await Users.createUser({ name, email, role });

            res.status(201).json(newUser);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // make changes to a user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, role } = req.body;
            const updatedUser = await Users.updateUser(id, { name, email, role });

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).send("User not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await Users.deleteUser(id);

            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).send("User not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    //Search for a user by name
    searchUsers: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const users = await UsersModel.searchUsers(searchTerm);
            res.json(users);
        } catch (err) {
            res.status(500).send("Server error: " + err.message);
        }
    }
};

module.exports = userController;
