const { Router } = require('express')
const router = Router()
const conn = require("../../db/conn");

//Возможное добавление в дальнейшем
router.post('/add', async (req, res) => {

})

//Получение с бд
router.get('/api/getdata', async (req, res) => {
    try {
        conn.query("SELECT * FROM yummireviewdb.establishments;", (err, result) => {
            if (err) {
                console.log("error")
            } else {
                console.log("data get")
                res.status(201).json({ status: 201, data: result })
            }
        })
    } catch (error) {
        res.status(422).json({ status: 422, error })
    }
})

module.exports = router