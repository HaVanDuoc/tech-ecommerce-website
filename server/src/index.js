const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const initRoute = require("./routes")
const bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
const ConnectionDatabase = require("./config/db.config")

// Middleware
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("common"))
app.use(express.json({ limit: "200mb" }))
app.use(cors())

// Connect to DB
ConnectionDatabase()

// Routes
initRoute(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`[server] Server is running on port ${PORT}`)
})
