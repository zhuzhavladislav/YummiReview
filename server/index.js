require("dotenv").config();
require("./db/conn");
const express = require("express")
const cors = require("cors");
const router = require("./routes/api/establishment.route")
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json({ extended: true }))

//router
app.use(router)

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/api/uploads', express.static('uploads'));

//cors
app.use(cors());

app.listen(port, () => console.log(`Server started on port ${port}`))