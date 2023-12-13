const pool = require('../db');

const Users = {
    
    async getAllUsers() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (err) {
            throw err;
        }
    },

    
    async getUserById(id) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async createUser({ name, email, role }) {
        try {
            const result = await pool.query(
                'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
                [name, email, role]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async updateUser(id, { name, email, role }) {
        try {
            const result = await pool.query(
                'UPDATE users SET name = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING *',
                [name, email, role, id]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async deleteUser(id) {
        try {
            const result = await pool.query(
                'DELETE FROM users WHERE user_id = $1 RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async searchUsers(searchTerm) {
        try {
            const result = await pool.query("SELECT * FROM users WHERE username ILIKE $1 OR email ILIKE $1", [`%${searchTerm}%`]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    
};

module.exports = Users;
