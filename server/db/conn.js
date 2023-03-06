const { createConnection } = require('mysql2')

const conn = createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conn.connect((error) => {
    if (error) throw error;
    console.log(`Connected to DB ${process.env.DATABASE}`)
});

module.exports = conn