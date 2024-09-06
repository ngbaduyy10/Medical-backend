const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors());

const routes = require("./api/routes/index.route");
routes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})