const pool = require('../db');
const bcrypt = require('bcryptjs');

const UserAuthentication = {
    
    async createUser({ username, password }) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await pool.query(
                'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *',
                [username, hashedPassword]
            );
            return newUser.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async findUserByUsername(username) {
        try {
            const user = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );
            return user.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async validateUser(username, password) {
        try {
            const user = await this.findUserByUsername(username);
            if (user && await bcrypt.compare(password, user.hashed_password)) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }
};

module.exports = UserAuthentication;
