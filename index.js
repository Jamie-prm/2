const express = require("express")
const bodyparser = require("body-parser")
const db = require("./db")

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    const result = await db.query("select * FROM users");
    res.json(result);
});

app.get('/users', async (req, res) => {
    const { firstname } = req.query;

    if (firstname) {
        const result = await db.query("select * FROM users WHERE firstname = ?", [firstname]);
        res.json(result);
    } else {
        const result = await db.query("select * FROM users");
        res.json(result);
    }
});

app.get('/category', async (req, res) => {
    const result = await db.query("select * FROM categories");
    res.json(result);
});

app.get('/product', async (req, res) => {
    const result = await db.query("select * from product")
    res.json(result)
})

app.post('/users', async (req, res) => {
    const { username, password, firstname, lastname, email, phonenumber } = req.body;

    const result = await db.query(`
        INSERT INTO users (username, password, firstname, lastname, email, phonenumber)
        VALUES(?, ?, ?, ?, ?, ?)
    `, [username, password, firstname, lastname, email, phonenumber])

    res.json(result);
});

app.listen(4014, () => {
    console.log("API running")
})