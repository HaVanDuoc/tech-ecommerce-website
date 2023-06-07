const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const initRoute = require("./routes")
const bodyParser = require("body-parser")

const app = express()

// Middleware
dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: "250mb" }))
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:9000"],
    })
)
app.use(morgan("common"))

// Connect to DB
require("./utils/connectDB")

// Routes
initRoute(app)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
