const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'schoolbridge'
        });
        
        console.log('✅ Database connected successfully!');
        await connection.end();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure MySQL is installed and running');
        console.log('2. Check your .env file credentials');
        console.log('3. Create the database: CREATE DATABASE schoolbridge;');
        console.log('4. Try resetting MySQL password');
    }
}

testConnection();