const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const secret = process.env.secret || "SECRET";

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});