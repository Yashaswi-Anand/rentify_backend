const express = require("express");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
// const auth_router = require('./config/auth.router')

const cors_option = {
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(cors_option))

app.use(cookieParser());
app.use(express.json({ limit: process.env.PAYLOAD_SIZE }));
app.use(express.urlencoded({ limit: process.env.PAYLOAD_SIZE }));

// app.use('/api/auth', auth_router)

app.get("/", async (req, res) => {
    res.json({ message: "alive renify" });
});

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});